import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../store/slices/searchSlice';

type SearchBoxProps = {
  placeholder: string
};

function SearchBox({ placeholder = '' }: SearchBoxProps) {
  const dispatch = useDispatch();

  const onChange = (e: any) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBox;
