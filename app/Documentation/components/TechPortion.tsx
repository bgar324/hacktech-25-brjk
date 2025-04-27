import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TechPortion = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 text-left">Layer</TableHead>
            <TableHead className="w-1/4 text-left">Technology</TableHead>
            <TableHead className="w-2/4 text-left">Purpose</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">Hardware Sensor Layer</TableCell>
            <TableCell className="text-left">Leap Motion Controller</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Captures high-fidelity 3D hand, wrist, and finger movement data at
              120 frames per second using infrared imaging.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Sensor Processing Layer
            </TableCell>
            <TableCell className="text-left">Ultraleap Hand Tracking (Desktop)</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Processes raw infrared data into structured 3D hand models with
              positional and rotational information.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Backend Computation Layer
            </TableCell>
            <TableCell className="text-left">Python + NumPy + WolframAlpha API</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Extracts positional data, computes joint angles and ergonomic risk
              scores, and optionally solves complex ergonomic equations.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Database Layer</TableCell>
            <TableCell className="text-left">Firebase Firestore</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Stores user posture metrics, timestamps, and ergonomic analytics
              in a real-time cloud database.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Authentication Layer (Optional)
            </TableCell>
            <TableCell className="text-left">Firebase Auth</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Handles user signup, login, and secure tracking of personalized
              ergonomic history.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Frontend Application Layer
            </TableCell>
            <TableCell className="text-left">React.js (Vite or Next.js)</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Displays real-time ergonomic feedback, posture alerts, and
              diagnostic reports through an interactive web interface.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Cloud Connection Layer
            </TableCell>
            <TableCell className="text-left">Firebase Admin SDK (Python)</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Synchronizes computed posture data from backend computation to
              Firebase cloud storage for frontend access.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Frontend Data Fetching Layer
            </TableCell>
            <TableCell className="text-left">Firebase Web SDK</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Fetches real-time posture data from Firestore and pushes live
              updates to the React frontend interface.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Styling and UI Layer</TableCell>
            <TableCell className="text-left">TailwindCSS / shadcn/ui</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Applies responsive, mobile-first design principles to ensure a
              smooth and readable user experience across devices.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Hosting Layer (Optional)
            </TableCell>
            <TableCell className="text-left">Vercel or Firebase Hosting</TableCell>
            <TableCell className="text-left break-words whitespace-normal">
              Hosts the web application and ensures low-latency delivery of the
              dashboard to users globally.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Data Flow</h3>
        <p className="text-gray-700">
          The Leap Motion sensor continuously captures hand position data, which
          is processed by our Python backend to detect ergonomic risks. This
          data is then stored in a Firestore Database and immediately reflected in the React
          frontend, providing users with real-time feedback about their hand
          posture and potential strain risks.
        </p>
      </div>
    </>
  );
};

export default TechPortion;
