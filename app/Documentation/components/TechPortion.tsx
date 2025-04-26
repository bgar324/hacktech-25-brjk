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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Layer</TableHead>
          <TableHead>Technology</TableHead>
          <TableHead>Purpose</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Sensor</TableCell>
          <TableCell>Leap Motion</TableCell>
          <TableCell>Captures real-time 3D hand data</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Backend</TableCell>
          <TableCell>Python</TableCell>
          <TableCell>Computes posture metrics, sends to Firebase</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Database</TableCell>
          <TableCell>Firebase Firestore</TableCell>
          <TableCell>Stores live posture diagnostics</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Frontend</TableCell>
          <TableCell>React.js</TableCell>
          <TableCell>Displays live ergonomic feedback</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default TechPortion;
