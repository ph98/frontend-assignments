import { Input } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { setSearchText } from '../../store/slices/searchSlice';

type SearchBoxProps = {
  placeholder: string
};

function SearchBox({ placeholder = '' }: SearchBoxProps) {
  const dispatch = useAppDispatch();

  const onChange = (e: any) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      size="large"
    />
  );
}

export default SearchBox;
