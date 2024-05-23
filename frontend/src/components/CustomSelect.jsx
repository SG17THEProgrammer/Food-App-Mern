import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ value, onChange, cardProduct }) => {
  console.log(onChange);
  const options = [
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Vegetable', label: 'Vegetable' },
    { value: 'Icecream', label: 'Icecream' },
    { value: 'Dosa', label: 'Dosa' },
    { value: 'Pizza', label: 'Pizza' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Cake', label: 'Cake' },
    { value: 'Burger', label: 'Burger' },
    { value: 'Paneer', label: 'Paneer' },
    { value: 'Sandwich', label: 'Sandwich' },
    { value: 'Dinner', label: 'Dinner' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Snack', label: 'Snack' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'NightMunchies', label: 'Night Munchies' }
  ];

  return (
    <Select
      options={options}
      onChange={onChange}
      value={options.find(option => option.value === value)}      
      placeholder={cardProduct.category}
      styles={{
        control: (provided) => ({
          ...provided,
          height: '10px'
        })
      }}
    />
  );
};

export default CustomSelect;
