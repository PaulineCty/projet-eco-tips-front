import { useState } from 'react';
import ButtonsAdd from '@/components/Admin/Tags/ButtonsAdd';

function FormAddTag() {
  const [textValue, setTextValue] = useState('catégorie');
  const [currentColor, setCurrentColor] = useState('#542F98');

  const onReset = () => {
    setTextValue('catégorie');
    setCurrentColor('#542F98');
  };

  return (
    <form className="flex flex-col gap-8 items-center">
      <div className="flex gap-3 items-center">
        <textarea
          name="name"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="text-center min-w-[2rem] p-2 text-xs resize-none text-white font-bold w-48 rounded"
          style={{ backgroundColor: currentColor }}
          rows="1"
          maxLength="40"
        />
        <input
          type="color"
          name="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="cursor-pointer rounded border-none"
        />
      </div>
      <ButtonsAdd color={currentColor} name={textValue} onReset={onReset} />
    </form>
  );
}

export default FormAddTag;
