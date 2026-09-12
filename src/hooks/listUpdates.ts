import { BuyItem } from "../components/BuyList";

type ListUpdate = {
  listId: string;
  values: BuyItem[];
};

let pendingUpdate: ListUpdate | null = null;

export function saveListUpdate(update: ListUpdate) {
  pendingUpdate = update;
}

export function consumeListUpdate() {
  const update = pendingUpdate;
  pendingUpdate = null;
  return update;
}