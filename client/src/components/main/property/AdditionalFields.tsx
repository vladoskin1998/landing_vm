import React, { useState } from 'react';
import { AdditionalFieldType } from '../../../types/types';

interface Props {
  additionalFields: AdditionalFieldType[];
  setAdditionalFields: React.Dispatch<React.SetStateAction<AdditionalFieldType[]>>;
}

export const AdditionalFields: React.FC<Props> = ({ additionalFields, setAdditionalFields }) => {
  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { label: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  const handleFieldChange = (index: number, field: keyof AdditionalFieldType, value: string) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setAdditionalFields(updatedFields);
  };

  return (
    <div className="login_item">
      <h3 className="login__text">Additional Fields</h3>
      <button onClick={handleAddField} className="login__nav--add">
        Additional +
      </button>
      {additionalFields.map((field, index) => (
        <div key={index} className="add__additional">
          <input
            className="login__input"
            type="text"
            placeholder="Name"
            value={field.label}
            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
          />
          <input
            className="login__input"
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
          />
          <button onClick={() => handleRemoveField(index)} className="add__del">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

// Ваш компонент, где нужно использовать AdditionalFields
const YourComponent: React.FC = () => {
  const [additionalFields, setAdditionalFields] = useState<AdditionalFieldType[]>([]);

  return <AdditionalFields additionalFields={additionalFields} setAdditionalFields={setAdditionalFields} />;
};

export default YourComponent;
