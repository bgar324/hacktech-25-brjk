import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <Navbar isSignedIn />
      <div className="max-w-screen-7xl items-center justify-center text-center mx-32">
        <h1 className="text-3xl mb-4 leading-12">Science Behind It</h1>
        <p className="text-gray-800 mb-6">
          Our system is built on scientific research linking wrist posture to
          carpal tunnel pressure during typing activities. We leverage real-time
          tracking to help users maintain safer ergonomic positions based on
          medical data.
        </p>

        <div className="flex flex-col gap-12 text-left">
          {/* Section 1 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Wrist Extension and Carpal Tunnel Pressure
            </h2>
            <p className="text-gray-800">
              Studies show that carpal tunnel pressure increases significantly
              when the wrist is extended beyond 15°. The highest pressure is
              observed at 45° of wrist extension during typing, while neutral
              (0°–15°) angles produce the lowest pressure. Radial deviation
              (tilting the wrist toward the thumb) at 15° also leads to elevated
              pressure compared to neutral positioning.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Real-World Typing Angles</h2>
            <p className="text-gray-800">
              In a study where participants typed for 10–15 minutes, the average
              wrist extension was ~23.4° (left) and ~19.9° (right), with an
              average ulnar deviation of ~14.7° (left) and ~18.6° (right). Over
              73% of participants typed with wrist extension greater than 15°,
              exposing them to heightened risk of ergonomic strain.
            </p>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Why Real-Time Monitoring Matters
            </h2>
            <p className="text-gray-800">
              Our system continuously monitors wrist angles to help users stay
              within the safe ergonomic range of 0°–15°. By providing live
              feedback, we aim to reduce the long-term risk of carpal tunnel
              syndrome and repetitive strain injuries associated with prolonged
              typing.
            </p>
          </div>

          {/* (Optional) Quick Table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Summary of Key Risk Factors
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk Factor</TableHead>
                    <TableHead>Safe Range</TableHead>
                    <TableHead>Risk Range</TableHead>
                    <TableHead>Observed Averages</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Wrist Extension</TableCell>
                    <TableCell>0°–15°</TableCell>
                    <TableCell>30°+ (highest risk at 45°)</TableCell>
                    <TableCell>~19°–23°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Radial/Ulnar Deviation</TableCell>
                    <TableCell>0°–10°</TableCell>
                    <TableCell>15°+ Radial/Ulnar</TableCell>
                    <TableCell>~14°–18°</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        {/* Works Cited Section */}
        <div className="flex flex-col gap-4 mt-16 text-left">
          <h2 className="text-2xl font-semibold">Works Cited</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2649727/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Rempel, David M., Keir, Peter J., Bach, Joel M. "Effect of Wrist
                Posture on Carpal Tunnel Pressure While Typing."{" "}
                <i>Journal of Orthopaedic Research</i>, vol. 16, no. 5, 1998,
                pp. 647–651.
              </a>
            </li>
            <li>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/10424183/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Serina, E.R., Tal, R., Rempel, D. "Wrist and Forearm Postures
                and Motions During Typing." <i>Applied Ergonomics</i>, vol. 28,
                no. 2, 1997, pp. 117–123.
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
