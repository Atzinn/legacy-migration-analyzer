import { useState } from "react"

import type { Analysis } from "./types/Analysis"

import DependenciesTable from "./components/DependenciesTable";
import InfoCard from "./components/InfoCard";


function App() {  
  const [jsonInput, setJsonInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);


  const parseDependencies = (dependencies: Record<string, string>) => {
    return Object.entries(dependencies).map(([name, version]) => ({
        name,
        version: version as string,
      }));
  }
  
  const analyzePackage = () => {
    setShowError(false);
    try {
      const parsed = JSON.parse(jsonInput);

      const deps = parseDependencies(parsed.dependencies || {})
      const devDeps = parseDependencies(parsed.devDependencies || {})
      
      const projectName = parsed.name;
      const projectVersion = parsed.version;
      
      const projectData = {
        projectName,
        projectVersion,
        dependencies: deps,
        devDependencies: devDeps,
      }

      setAnalysis(projectData)
    } catch {
      setShowError(true);
      setAnalysis(null)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 p-18">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <h1 className="text-4xl font-bold mb-2">
            Legacy Migration Anlyzer
          </h1>
          <p className="text-slate-600 mb-8">
            Analyze legacy project dependencies
          </p>

          {/* Package json loader */}

          <div className="bg-white rounded-xl shadow p-6">
            <textarea 
              className="w-full h-64 border rounded-lg p-4 font-mono cursor-text"
              placeholder="Put here your package.json"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <button
              onClick={analyzePackage}
              className="mt-4 px-6 py-3 rounded-lg bg-black text-white hover:opacity-90 cursor-pointer hover:bg-gray-700 transition duration-100 ease-in"
            >Analyze</button>
          </div>

          {/* Project info cards */}

          {
            (analysis?.dependencies.length > 0 || analysis?.devDependencies.length > 0) && (
              <div className="bg-white rounded-xl shadow p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Project Info
                </h2>
                <div className="min-w-100 grid grid-cols-2 p-5">
                  <InfoCard title={"Project Name"} data={analysis?.projectName}/>
                  <InfoCard title={"Project Version"} data={analysis?.projectVersion} />
                  <InfoCard title={"No. Depenedencies"} data={analysis?.dependencies.length} />
                  <InfoCard title={"No. Dev Dependencies"} data={analysis?.devDependencies.length} />
                </div>
              </div>
            )
          }

          {/* Main dependecnies */}
          {
            analysis?.dependencies.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Dependencies
                </h2>
                <DependenciesTable dependencies={analysis.dependencies}/>
              </div>
            )

          }

          {/* Dev Dependencies */}

          {
            analysis?.devDependencies.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Dev Dependencies
                </h2>
                <DependenciesTable dependencies={analysis.devDependencies}/>
              </div>
            )
          }

          {/* Error */}
          {
            showError && (
              <div className="bg-red-300 rounded-xl shadow p-6 mt-8">
                <p className="text-2xl text-red-600 font-semibold mb-4">
                  There's an error with the package.json you entered. <br/>
                  Please review it and try again.
                </p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
