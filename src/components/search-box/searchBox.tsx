import { Input } from 'antd';

type SearchBoxProps = {
  placeholder: string
};

function SearchBox({ placeholder = '' }: SearchBoxProps) {
  const onSearch = (value: string) => {
    console.log('e', value);
  };
  // const
  return (
    <div>
      <Input.Search
        placeholder={placeholder}
        allowClear
        onSearch={onSearch}
        // style={{ width: 300 }}
      />
    </div>
  );
}

export default SearchBox;
