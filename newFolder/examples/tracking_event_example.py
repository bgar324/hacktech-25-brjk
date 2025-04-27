"""Prints the palm position of each hand, every frame. When a device is 
connected we set the tracking mode to desktop and then generate logs for 
every tracking frame received. The events of creating a connection to the 
server and a device being plugged in also generate logs. 
"""

import leap
import time
import numpy as np
import json


class MyListener(leap.Listener):
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
        #print(f"Frame {event.tracking_frame_id} with {len(event.hands)} hands.")
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

            
            # # 1) grab the elbow & wrist from the arm bone
            

            # # build the “forearm” vector elbow→wrist
            #v_arm = np.array[wrist_pt.x - elbow.x, wrist_pt.y - elbow.y, wrist_pt.z - elbow.z]
            #v_armMag = v_arm/sum(v_arm)

            # # 2) build the “wrist→palm” vector
            # palm_pt = hand.palm.position
            #v_wrist = [hand.palm.position.x - wrist_pt.x, hand.palm.position.y - wrist_pt.y, hand.palm.position.z - wrist_pt.z]
            #v_wristMag = v_wrist/sum(v_wrist)
            
            # theta = np.arccos(np.clip(np.dot(v_armMag[0:1], v_wristMag[0:1]))) #projection angle calc onto x-y plane
            # phi = np.arccos(np.clip(np.dot(v_armMag[1:2], v_wristMag[1:2])))   #projecction angle calc ony y-z plane


            # handy.append([theta, phi])

            #final matrix document
            #[hand_type, palm, wrist, thumb joint, thumb middle, thumb tip, index joint, index middle, index tip, middle joint,
            # middle middle, middle tip, ring joint, ring middle, ring tip, pinky joint, pinky middle, pinky tip, theta, phi ]

            finalData = {  "hand_type": handy[0],
                         "palm":handy[1],
                         "wrist":handy[2],
                         "thumb_joint": handy[3],
                         "thumb_middle": handy[4],
                         "thumb_tip":handy[5],
                         "index_joint":handy[6],
                         "index_middle": handy[7],
                         "index_tip": handy[8],
                         "ring_joint":handy[9],
                         "ring_middle": handy[10],
                         "ring_tip": handy[11],
                         "pinky_joint": handy[12],
                         "pinky_middle": handy[13],
                         "pinky_tip":handy[14],
            }
            with open("output.json", "w") as file:
                json.dump(finalData, file, indent=4)


def main():
    my_listener = MyListener()

    connection = leap.Connection()
    connection.add_listener(my_listener)

    running = True

    with connection.open():
        connection.set_tracking_mode(leap.TrackingMode.ScreenTop)
        while running:
            time.sleep(100)


if __name__ == "__main__":
    main()