import React from "react";

type IProps = {
  data: {
    title: string;
    desc: string;
    content: string;
  };
  cardType?: "with-bg" | "bordered-bg";
};
function CardSummary({ data, cardType = "with-bg" }: IProps) {
  const styles = {
    "with-bg": "bg-blue-200",
    "bordered-bg": "border-2 border-blue-200",
  };

  return (
    <div
      className={`flex w-full flex-col rounded rounded-lg p-[12px] lg:w-[255px] ${styles[cardType]}`}
    >
      <div className="text-md font-semibold text-blue-600">{data.title}</div>
      <div className="text-xs text-blue-500">{data.desc}</div>
      <div className="pt-2 text-3xl font-semibold text-blue-700">
        {data.content}
      </div>
    </div>
  );
}

export default CardSummary;
