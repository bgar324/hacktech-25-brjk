"""Prints the palm position of each hand, every frame. When a device is 
connected we set the tracking mode to desktop and then generate logs for 
every tracking frame received. The events of creating a connection to the 
server and a device being plugged in also generate logs. 
"""

import leap
import time
import numpy as np
import json
import os
from google.cloud import firestore
from datetime import datetime

global finalData
global intt 
intt = 0
class MyListener(leap.Listener):
    def __init__(self):
        self.finalData = ""
        
    def on_connection_event(self, event):
        print("Connected")
    def on_device_event(self, event):
        try:
            with event.device.open():
                info = event.device.get_info()
        except leap.LeapCannotOpenDeviceError:
            info = event.device.get_info()

        print(f"Found device {info.serial}")

    def on_tracking_event(self, event):
        global intt
        #print(f"Frame {event.tracking_frame_id} with {len(event.hands)} hands.")
        # print(intt)
        intt += 1
        for hand in event.hands:
            hand_type = "left" if str(hand.type) == "HandType.Left" else "right"

            arm_bone = hand.arm              # CFFI Bone for the forearm
            elbow    = arm_bone.prev_joint   # Vector at the elbow
            wrist_pt = arm_bone.next_joint   # Vector at the wrist

                #f"Hand id {hand.id} is a {hand_type} hand with position ({hand.palm.position.x}, {hand.palm.position.y}, {hand.palm.position.z})."
            handy = [hand_type, [f"{hand.palm.position.x:.2f}", f"{hand.palm.position.y:.2f}", f"{hand.palm.position.z:.2f}"],
                                [f"{wrist_pt.x:.2f}", f"{wrist_pt.y:.2f}", f"{wrist_pt.z:.2f}"]]
            
            for digit in (hand.thumb, hand.index, hand.middle, hand.ring, hand.pinky):
                # PIP
                joint = digit.proximal
                j = joint.next_joint
                handy.append([f"{j.x:.2f}", f"{j.y:.2f}", f"{j.z:.2f}"])
                # DIP
                middle = digit.intermediate
                j = middle.next_joint
                handy.append([f"{j.x:.2f}", f"{j.y:.2f}", f"{j.z:.2f}"])
                # TIP
                tip = digit.distal
                j = tip.next_joint
                handy.append([f"{j.x:.2f}", f"{j.y:.2f}", f"{j.z:.2f}"])

            
            v_palmNormal = np.array([
            hand.palm.normal.x,
            hand.palm.normal.y,
            hand.palm.normal.z
            ])
            v_palmNormalMag = v_palmNormal / np.linalg.norm(v_palmNormal)
        
            # # build the “forearm” vector elbow→wrist
            varmx = wrist_pt.x - elbow.x
            varmy = wrist_pt.y - elbow.y
            varmz = wrist_pt.z - elbow.z
            v_arm =np.array([varmx, varmy, varmz])
            v_armMag = v_arm/np.linalg.norm(v_arm)

            # # 2) build the “wrist→palm” vector
            palm_pt = hand.palm.position
            v_wrist = np.array([hand.palm.position.x - wrist_pt.x, hand.palm.position.y - wrist_pt.y, hand.palm.position.z - wrist_pt.z])
            v_wristMag = v_wrist/np.linalg.norm(v_wrist)
            
            radDev = np.arccos(np.clip(np.dot(v_armMag, v_wristMag), -1.0, 1.0 )) *180 / np.pi
            flexEx = (np.arctan2(v_wrist[1], v_wrist[0]) - np.arctan2(v_arm[1], v_arm[0]))*180 / np.pi
            
            def pronation_angle(a, p, up=np.array([0.,0.,1.])):
                referencePlane = (up - np.dot(up, a))
                referencePlane = referencePlane / np.linalg.norm(referencePlane)

                proj = p - np.dot(p, a)*a
                proj = proj / np.linalg.norm(proj)

                x = np.dot(referencePlane,    proj)
                y = np.dot(a, np.cross(referencePlane, proj))
                return 90 + np.arctan2(y, x) *180 / np.pi
            
            handy.append([
                radDev,
                flexEx,
                pronation_angle(v_armMag,v_palmNormalMag)
            ])
            deviationAverage = 0
            flexationAverage = 0
            pronatnionAverage = 0
            for i in range(0, 20):
                deviationAverage += handy[18][0]
                flexationAverage +=handy[18][1]
                pronatnionAverage += handy[18][2]
            deviationAverage /= 20
            flexationAverage /= 20
            pronatnionAverage /= 20
            #final matrix document
            #[hand_type, palm, wrist, thumb joint, thumb middle, thumb tip, index joint, index middle, index tip, middle joint,
            # middle middle, middle tip, ring joint, ring middle, ring tip, pinky joint, pinky middle, pinky tip, theta, phi ]
            self.finalData = {  "hand_type": handy[0],
                         "palm":handy[1],
                         "wrist":handy[2],
                         "thumb_joint": handy[3],
                         "thumb_middle": handy[4],
                         "thumb_tip":handy[5],
                         "index_joint":handy[6],
                         "index_middle": handy[7],
                         "index_tip": handy[8],
                         "middle_joint":handy[9],
                         "middle_middle": handy[10],
                         "middle_tip": handy[11],
                         "ring_joint":handy[12],
                         "ring_middle": handy[13],
                         "ring_tip": handy[14],
                         "pinky_joint": handy[15],
                         "pinky_middle": handy[16],
                         "pinky_tip":handy[17],
                         "angle(LR, UPDO, ROT)" :handy[18]
            }


            # Reference to the Firestore collection

            # Custom Document ID
            custom_id = 'my_custom_id_124'  # <-- You define your ID here

            # Data to be added to the document
            now = datetime.now()
            formatted_time = now.strftime("%H:%M:%S")
            if (self.finalData["hand_type"] == "right"):
                data = {
                    'hand_type': self.finalData["hand_type"],
                    'wrist': self.finalData["palm"],
                    "thumb_joint": self.finalData["thumb_joint"],
                    "thumb_middle": self.finalData["thumb_middle"],
                    "thumb_tip": self.finalData["thumb_tip"],
                    "index_joint": self.finalData["index_joint"],
                    "index_middle": self.finalData["index_middle"],
                    "index_tip": self.finalData["index_tip"],
                    "ring_joint":self.finalData["ring_joint"],
                    "ring_middle":self.finalData["ring_middle"],
                    "ring_tip":self.finalData["ring_tip"],
                    "pinky_joint": self.finalData["pinky_joint"],
                    "pinky_middle": self.finalData["pinky_middle"],
                    "pinky_tip": self.finalData["pinky_tip"],
                    "deviation": int(self.finalData["angle(LR, UPDO, ROT)"][0])*-1,
                    "flexion": int(self.finalData["angle(LR, UPDO, ROT)"][1])*-1,
                    "pronation": int(self.finalData["angle(LR, UPDO, ROT)"][2])*-1,
                    "pointAverage": {"x":deviationAverage*-1, "y":flexationAverage*-1, "z":pronatnionAverage*-1},
                    "timestamp": formatted_time
                }
            data = {
                'hand_type': self.finalData["hand_type"],
                'wrist': self.finalData["palm"],
                "thumb_joint": self.finalData["thumb_joint"],
                "thumb_middle": self.finalData["thumb_middle"],
                "thumb_tip": self.finalData["thumb_tip"],
                "index_joint": self.finalData["index_joint"],
                "index_middle": self.finalData["index_middle"],
                "index_tip": self.finalData["index_tip"],
                "ring_joint":self.finalData["ring_joint"],
                "ring_middle":self.finalData["ring_middle"],
                "ring_tip":self.finalData["ring_tip"],
                "pinky_joint": self.finalData["pinky_tip"],
                "pinky_middle": self.finalData["pinky_middle"],
                "pinky_tip": self.finalData["pinky_tip"],
                "deviation": self.finalData["angle(LR, UPDO, ROT)"][0],
                "flexion": self.finalData["angle(LR, UPDO, ROT)"][1],
                "pronation": self.finalData["angle(LR, UPDO, ROT)"][2],
                "pointAverage": {"x":deviationAverage, "y":flexationAverage, "z":pronatnionAverage},
                "timestamp": formatted_time
            }
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/jonnie/Downloads/hacktech25brjk-firebase-adminsdk-fbsvc-fcb62fcc70.json"
        db = firestore.Client()
        collection_ref = db.collection('first')
        if (intt % 100 == 0):
            doc_ref = collection_ref.add(data)
            # print('yes')
            
            
# Call the function to add the document
            
            

    
def main():
    my_listener = MyListener()

    connection = leap.Connection()
    connection.add_listener(my_listener)
    running = True
    document_id = 'example_document'  # The ID of the document
    field = 'new_field'  # The field to which you want to add data
    content = "This is the new content to add to the document."

    with connection.open():
        connection.set_tracking_mode(leap.TrackingMode.ScreenTop)
        while running:
            time.sleep(100)


if __name__ == "__main__":
    main()