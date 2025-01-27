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
  onAddItem: (data: newItem) => void;
};

function AddItem({ onAddItem }: Iprops) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
    onAddItem(form);
    onClose();
  }

  function resetForm() {
    setForm({
      name: "",
      price: 0,
      qty: 0,
      unitType: "Meter",
    });
  }

  function disable() {
    return form.name == "" || form.price == 0 || form.qty == 0;
  }

  return (
    <>
      <Button
        color="primary"
        onPress={() => {
          onOpen();
        }}
      >
        Tambah Item
      </Button>
      <Modal
        placement="auto"
        isOpen={isOpen}
        onOpenChange={() => {
          resetForm();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Item baru
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e) => onChange(e)}
                  name="name"
                  type="text"
                  size="sm"
                  placeholder="Nama Produk"
                />
                <Input
                  name="price"
                  type="number"
                  size="sm"
                  placeholder="Harga"
                  onChange={(e) => onChange(e)}
                />
                <Input
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

export default AddItem;
