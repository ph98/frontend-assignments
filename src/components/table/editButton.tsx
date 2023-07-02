import { Button } from 'antd';
import useSkillTestData from '../../hooks/useSkillTestData';

type EditButtonProps = {
  email: string
};

function EditButton({ email }: EditButtonProps) {
  const { setSelectedCustomer } = useSkillTestData();
  return (
    <Button
      onClick={() => {
        setSelectedCustomer(email);
      }}
    >
      Edit
    </Button>
  );
}

export default EditButton;
