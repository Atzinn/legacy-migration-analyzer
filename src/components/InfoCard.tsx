function InfoCard({ title, data }) {
  return (
    <div className="w-52 h-40 m-2 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-2 bg-black" />

      <div className="h-full p-4 flex flex-col justify-between">
        <p className="text-sm text-slate-500 font-medium">
          {title}
        </p>

        <p className="text-4xl font-bold">
          {data}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
