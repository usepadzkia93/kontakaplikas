import { useEffect, useState } from 'react'
import backgroundVideo from './assets/background.mp4'
import './App.css'

function App() {
const [contacts, setContacts] = useState(() => {
  const saved = localStorage.getItem ("contacts")
  return saved ? JSON.parse(saved) : []
})

const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')

useEffect(() => {
  localStorage.setItem("contacts", JSON.stringify(contacts))
}, [contacts])

const handleDelete = (indexToDelete) => {
  const updatedContacts = contacts.filter((_, index) => index !== indexToDelete)
  setContacts(updatedContacts)
}

const handleDeleteAll = () => {
  setContacts([])
}

  return (
    <>
    <div className="absolute inset-0 overflow-hidden -z-10"> 
      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Optional: Overlay untuk readability */}
    </div>

      <div>
        <h1 className='text-4xl font-bold mb-10 text-white'>Aplikasi Kontak</h1>
      </div>
      <section className='flex'>
        <section className='text-white basis-2/3  p-6 bg-gray-400/70 rounded-2xl mx-20 my-30'>
          <h2 className='flex mb-4 font-bold opacity-100 text-2xl'>Tambah Kontak</h2>
          <div className=''>
            <div className='items-center mb-4 '>
              <h2 className='text-start font-bold'>Nama :</h2>
              <form action="" className=''>
                <input 
                  type="text" 
                  placeholder='Masukkan Nama Lengkap' 
                  className=' bg-gray-100/80 w-full rounded py-1 px-2 text-black'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  />
              </form>  
            </div>
            <div className='items-center mb-1'>
              <h2 className='text-start font-bold'>Nomor Telepon :</h2>
              <form
                onSubmit={(e) => e.preventDefault()}
                className=''>
                <input 
                  type="number" 
                  placeholder='Contoh: 081234567890' 
                  className='bg-gray-100/80 w-full rounded py-1 px-2 text-black'
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  />
                <button 
                  className='bg-white hover:bg-gray-300 opacity-100 w-full py-2 text-black font-bold rounded-lg mt-4'
                  onClick={() => {
                    if (!newName.trim() || !newNumber.trim()) {
                      alert("Nama dan Nomor tidak boleh kosong")
                      return
                    }

                    const newContact = {
                      name: newName,
                      number: newNumber
                    }

                    setContacts([...contacts, newContact])
                    setNewName('')
                    setNewNumber('')
                  }}
                >Tambahkan Kontak</button>
              </form>  
            </div>
          </div>
        </section>

        <section className='basis-1/2 mx-20'>
          <h2 className='text-white text-4xl font-bold mb-4'>DAFTAR KONTAK</h2>
          <div className='bg-gray-400/70 p-4 rounded-lg text-white'>
          {contacts.length === 0 ? (
            <p className='text-white'>Belum ada kontak yang ditambahkan</p>
          ) : (
            <ul>
            {contacts.map((contact, index) => (
              <li key={index} className='mb-2 border-b  pb-2'>
                <div className="flex justify-between items-center">
                  <div>
                    <p className='font-semibold text-white text-lg text-start'>{contact.name}</p>
                    <p className='text-sm text-gray-200 text-start'>{contact.number}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(index)} 
                    className="bg-white hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </li>
              ))}
            </ul>
          )}

          {contacts.length > 0 && (
          <div>
              <button 
              onClick={handleDeleteAll}
              className='bg-white hover:bg-gray-300 text-black font-bold py-2 px-2 rounded-lg'>Hapus Semuanya</button>
          </div>
          )}
        </div>
      </section>
      </section>
    </>
  )
}

export default App
