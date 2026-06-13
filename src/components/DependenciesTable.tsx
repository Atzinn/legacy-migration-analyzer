import { useState, Fragment } from "react";

import type { DepenendecyInfo } from "../types/DependencyInfo";


function DependenciesTable({dependencies}) {
  const ROW_CLASS_NAME: string = "py-3 pl-1";

  const [search, setSearch] = useState<string>("");
  const [expandedDependency, setExpandedDependency] = useState<string>("")
  const [dependencyCache, setDependencyCache] = useState<Record<string, DepenendecyInfo>>({})
  
  const filteredDependencies = !search ? dependencies : dependencies.filter(dep => dep.name.toLowerCase().includes(search.toLowerCase()));
  
  const bgRow = (dep: string, idx: number): string => {
    if(dep === expandedDependency) {
      return "bg-slate-700 text-white font-bold"
    } else {
      if(idx % 2 != 0) {
        return "bg-slate-100 hover:bg-slate-200" 
      } else {
        return "hover:bg-slate-200"
      }
    }
  }

  const isUpToDate = (latest: string, installed: string): boolean => {
    // TODO: Compare semantic versions correctly
    return  (latest === installed)
  }

  const stateMessage = (state: boolean): string => {
    return state ? "Up to date" : "Update available"
  }
  
  const fetchData = (dependency: string): Promise<void> => {
    return fetch(`https://registry.npmjs.org/${dependency}`)
        .then(resp => resp.json())
        .then(data => {
          const obj: DepenendecyInfo = {
            "license": data?.license,
            "latest": data['dist-tags']['latest'],
            "homepage": data?.homepage,
            "description": data?.description
          }
          // setDependencyInfo(obj)
          setDependencyCache((cachedDependencies) => {
            return {
              ...cachedDependencies,
              [dependency]: obj
            }
          });
        })
        .catch(error => console.error("There'an error", error))
  }

  const toggleDependency = (dependencyName: string): void => {
    if (expandedDependency === dependencyName) {
      setExpandedDependency("");
      // setDependencyInfo(null);
      return;
    }
    
    if (!Object.hasOwn(dependencyCache, dependencyName)) {
      fetchData(dependencyName);
    }

    setExpandedDependency(dependencyName);
  }

  const currentDependencyInfo = dependencyCache[expandedDependency];

  return (
    <>
      <div className="mw-10 py-3 flex flex-col justify-center items-center">
        <input type="text" placeholder="Search..." className="w-[75%] border-b py-2 text-slate-500" onChange={ev => setSearch(ev.target.value)}/>
      </div>
      <table className="w-full rounded-lg">
        <thead>
          <tr className="border-b bg-black text-white">
            <th className="text-left py-3 pl-1">
              Name
            </th>
            <th className="text-left py-3">
              Version
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filteredDependencies.length === 0 && (
              <tr>
                <td className={ROW_CLASS_NAME}>
                  No depenedencies found
                </td>
              </tr>
            )
          }
          {
            filteredDependencies.map((dep, idx) => (
              <Fragment key={dep.name}>
                <tr
                  className={`${bgRow(dep.name, idx)} border-b cursor-pointer`}
                  onClick={() => toggleDependency(dep.name)}
                >
                  <td className={ROW_CLASS_NAME}>
                    {dep.name}
                  </td>
                  <td className={ROW_CLASS_NAME}>
                    {dep.version}
                  </td>
                </tr>
                {
                  (dep.name === expandedDependency) && (
                    <tr className="border-b">
                      <td className={ROW_CLASS_NAME}>
                        <div className="grid grid-cols-2">
                          <p className="font-bold">Latest Version: <span className="px-4 py-1 bg-slate-200 rounded-full text-md font-light">{currentDependencyInfo?.latest}</span></p>
                          <p className="font-bold">License: <span className="px-4 py-1 bg-slate-200 rounded-full text-md font-light">{currentDependencyInfo?.license}</span></p>
                          <p className="font-bold">Homepage: <a target="_blank" rel="noreferrer" href={currentDependencyInfo?.homepage} className="text-blue-300 hover:text-blue-600 transition-colors duration-75 ease-in">Visit Page</a></p>
                          <p className="font-bold">State: 
                            <span className={`${isUpToDate(currentDependencyInfo?.latest, dep.version) ? "text-green-400" : "text-amber-400"}`}>
                              {stateMessage(isUpToDate(currentDependencyInfo?.latest, dep.version))}
                            </span>
                          </p>
                        </div>
                        <div className="py-1 grid grid-cols-1">
                          <p className="font-bold">Description:</p>
                          <p className="text-md">{currentDependencyInfo?.description}</p>
                        </div>
                      </td>
                    </tr>
                  )
                }
              </Fragment>
            ))
            
          }
        </tbody>
      </table>
    </>
  )
}

export default DependenciesTable;
