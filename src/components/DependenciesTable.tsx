function DependenciesTable({dependencies}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3">
            Name
          </th>
          <th className="text-left py-3">
            Version
          </th>
        </tr>
      </thead>
      <tbody>
        {
          dependencies.map((dep) => (
            <tr
              key={dep.name}
              className="border-b"
            >
              <td className="py-3">
                {dep.name}
              </td>
              <td className="py-3">
                {dep.version}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default DependenciesTable;
