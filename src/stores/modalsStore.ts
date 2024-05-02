import { Modal } from 'antd';
import { create } from "zustand";

interface ModalStore {
  open: boolean;
  setOpen: (data: any) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (data: any) => set({ open: data }),
}));

export default useModalStore;
