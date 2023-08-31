import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";
import { apiClient } from "./service/ItemService";

export default function App() {
  const [items, setItems] = useState([]);

  function handleSetItems(item) {
    setItems((items) => [...items, item]);
    apiClient.post(`/items`, {
      packed: item.packed,
      description: item.description,
      quantity: item.quantity,
    });
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    items.map((item) =>
      item.id === id ? apiClient.delete(`/items/${id}`) : item
    );
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );

    items.map((item) =>
      item.id === id
        ? apiClient.put(`/items/${id}`, {
            packed: !item.packed,
            description: item.description,
            quantity: item.quantity,
          })
        : console.log(item)
    );
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems((items) => (items = []));
  }

  useEffect(function () {
    async function fetchItems() {
      await apiClient
        .get(`/items`)
        .catch((error) => console.error(error))
        .then((response) => setItems(response.data._embedded.items));
    }
    fetchItems();
  }, []);

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleSetItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}
