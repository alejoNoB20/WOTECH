export const CharacterCounter = ({ value }) => {
  const length = value?.length || 0;

  return (
    <div
      className={`flex flex-row text-sm place-content-end font-mono ${
        length > 290 ? "text-red-800" : "text-green-800"
      }`}
    >
      <span>{length}</span>
      <p>/300</p>
    </div>
  );
};
