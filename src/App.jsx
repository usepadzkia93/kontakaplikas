import { useEffect, useState } from "react";
import backgroundVideo from "./assets/background.mp4";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = (indexToDelete) => {
    const updatedContacts = contacts.filter(
      (_, index) => index !== indexToDelete
    );
    setContacts(updatedContacts);
  };

  const handleDeleteAll = () => {
    setContacts([]);
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
        {/* Optional: Overlay untuk readability */}
      </div>

      <div className="flex flex-col w-full min-h-screen overflow-hidden">
        <header className="py-6">
          <h1 className="text-4xl font-bold text-center text-white">
            Aplikasi Kontak
          </h1>
        </header>

        <main className="flex flex-col-reverse flex-1 w-full gap-8 px-4 lg:flex-row-reverse">
          <div className="basis-1/2">
            <h2 className="mb-4 text-4xl font-bold text-center text-white">
              DAFTAR KONTAK
            </h2>
          <section className="flex items-center justify-center ">
            
            <div className=" p-4 text-white rounded-lg bg-gray-400/70 max-h-[60vh] overflow-auto w-lg">
              {contacts.length === 0 ? (
                <p className="text-center text-white">Belum ada kontak yang ditambahkan</p>
              ) : (
                <ul>
                  {contacts.map((contact, index) => (
                    <li key={index} className="pb-2 mb-2 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white text-start">
                            {contact.name}
                          </p>
                          <p className="text-sm text-gray-200 text-start">
                            {contact.number}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(index)}
                          className="px-2 py-1 font-bold text-black bg-white rounded-lg hover:bg-gray-300"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {contacts.length > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={handleDeleteAll}
                    className="px-2 py-2 font-bold text-black bg-white rounded-lg hover:bg-gray-300"
                  >
                    Hapus Semua
                  </button>
                </div>
              )}
            </div>
          </section>
          </div>
          <section className="flex items-center justify-center basis-1/2">
            <section className="w-full max-w-md p-6 text-white rounded-2xl bg-gray-400/70">
              <h2 className="flex mb-4 text-2xl font-bold opacity-100">
                Tambah Kontak
              </h2>
              <div className="">
                <div className="items-center mb-4 ">
                  <h2 className="font-bold text-start">Nama :</h2>
                  <form action="" className="">
                    <input
                      type="text"
                      placeholder="Masukkan Nama Lengkap"
                      className="w-full px-2 py-1 text-black rounded bg-gray-100/80"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </form>
                </div>
                <div className="items-center mb-1">
                  <h2 className="font-bold text-start">Nomor Telepon :</h2>
                  <form onSubmit={(e) => e.preventDefault()} className="">
                    <input
                      type="number"
                      placeholder="Contoh: 081234567890"
                      className="w-full px-2 py-1 text-black rounded bg-gray-100/80"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                    />
                    <button
                      className="w-full py-2 mt-4 font-bold text-black bg-white rounded-lg opacity-100 hover:bg-gray-300"
                      onClick={() => {
                        if (!newName.trim() || !newNumber.trim()) {
                          alert("Nama dan Nomor tidak boleh kosong");
                          return;
                        }

                        const newContact = {
                          name: newName,
                          number: newNumber,
                        };

                        setContacts([...contacts, newContact]);
                        setNewName("");
                        setNewNumber("");
                      }}
                    >
                      Tambahkan Kontak
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
