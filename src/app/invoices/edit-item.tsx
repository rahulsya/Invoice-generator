import { newItem } from "@/@types/types";
import { formatNumber } from "@/utils";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

const units = [
  { key: "Roll", label: "Roll" },
  { key: "Meter", label: "Meter" },
  { key: "Pcs", label: "Pcs" },
];

type Iprops = {
  onEditItem: (data: newItem) => void;
  intialData?: newItem;
  onClose: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
};

function EditItem({
  onEditItem,
  intialData,
  onClose,
  isOpen,
  onOpenChange,
}: Iprops) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    qty: 0,
    unitType: "Meter",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const totalPrice = formatNumber(
    form?.price && form?.qty ? form.price * form.qty : 0
  );

  function onSave() {
    onEditItem(form);
    onClose();
  }

  React.useEffect(() => {
    if (intialData) {
      setForm({
        ...intialData,
      });
    }
  }, [intialData]);

  function disable() {
    return form.name == "" || form.price == 0 || form.qty == 0;
  }

  return (
    <>
      {/* <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button> */}
      <Modal
        placement="auto"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Item
              </ModalHeader>
              <ModalBody>
                <Input
                  value={form.name}
                  onChange={(e) => onChange(e)}
                  name="name"
                  type="text"
                  size="sm"
                  placeholder="Nama Produk"
                />
                <Input
                  value={`${form.price}`}
                  name="price"
                  type="number"
                  size="sm"
                  placeholder="Harga"
                  onChange={(e) => onChange(e)}
                />
                <Input
                  value={`${form.qty}`}
                  name="qty"
                  type="number"
                  size="sm"
                  placeholder="Quantity"
                  onChange={(e) => onChange(e)}
                />
                <Select
                  name="unitType"
                  placeholder="Pilih unit"
                  selectedKeys={[form.unitType]}
                  onChange={(e) => onChange(e)}
                >
                  {units.map((unit) => (
                    <SelectItem key={unit.key}>{unit.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  value={totalPrice.toString()}
                  disabled
                  type="text"
                  size="sm"
                  placeholder="Total"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button isDisabled={disable()} color="primary" onPress={onSave}>
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditItem;
