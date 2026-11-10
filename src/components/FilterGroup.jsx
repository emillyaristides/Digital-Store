const FilterGroup = ({ title, name, type, options, selected, onChange }) => {
    return (
      <div className="filter-group">
        <h3 className="filter-group-title">{title}</h3>
  
        {options.map((option) => (
          <label key={option} className="filter-option">
            <input
              type={type}
              name={name}
              checked={
                type === "radio"
                  ? selected === option
                  : selected.includes(option)
              }
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default FilterGroup;