import os
import sys
import time

# 1) Prepend the Ultraleap service's "bin" folder (where LeapC.dll lives)
leap_service_bin = r"C:/Users/jonnie/Documents/hackaton/hacktech-25-brjk/v41_python38/LeapC.dll"
os.environ["PATH"] = leap_service_bin + ";" + os.environ.get("PATH", "")

# 2) Add your Python SDK folder (with Leap.py + LeapPython.pyd)
sdk_folder = r"/Users/jonnie/Documents/hackaton/hacktech-25-brjk/v41_python38"
sys.path.insert(0, os.path.abspath(sdk_folder))

print("sys.path:", sys.path)
print("PATH:", os.environ["PATH"])
print("Leap.py exists:", os.path.isfile(os.path.join(sdk_folder, "Leap.py")))
print("LeapPython.pyd exists:", os.path.isfile(os.path.join(sdk_folder, "LeapPython.pyd")))
print("LeapC.dll exists:", os.path.isfile(os.path.join(leap_service_bin, "LeapC.dll")))

# 3) Now it can find both the .pyd and the .dll
import Leap

# Quick sanity check
print("LeapC.dll loaded from:", os.path.join(leap_service_bin, "LeapC.dll"))
print("Leap module loaded from:", Leap.__file__)
ctrl = Leap.Controller()
print("Service connected? ", ctrl.is_service_connected())  # should now be True
print("Leap connected?   ", ctrl.is_connected)  