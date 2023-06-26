type SearchBoxProps = {
  placeholder: string
};

function SearchBox({ placeholder = '' }: SearchBoxProps) {
  return (
    <div>
      SearchBox
      <input placeholder={placeholder} />
    </div>
  );
}

export default SearchBox;
