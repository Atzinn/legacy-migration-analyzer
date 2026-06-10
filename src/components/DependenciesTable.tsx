import { useState } from "react";

function DependenciesTable({dependencies}) {
  const bgRow = (idx) => idx % 2 != 0 ? "border-b bg-slate-100" : "border-b"  
  const [search, setSearch] = useState("");
  const filteredDependencies = !search ? dependencies : dependencies.filter(dep => dep.name.toLowerCase().includes(search.toLowerCase()));
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
            filteredDependencies.length == 0 && (
              <tr>
                <td className="py-3 pl-1">
                  No depenedencies found
                </td>
              </tr>
            )
          }
          {
            filteredDependencies.map((dep, idx) => (
              <tr
                key={dep.name}
                className={`${bgRow(idx)} hover:bg-slate-200`}
              >
                <td className="py-3 pl-1">
                  {dep.name}
                </td>
                <td className="py-3 pl-1">
                  {dep.version}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default DependenciesTable;
