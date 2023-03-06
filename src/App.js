import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyAIIBzUotntUNvpuhRrjeO1G7swOxEFT58",
  authDomain: "my-first-react-c9.firebaseapp.com",
  projectId: "my-first-react-c9",
  storageBucket: "my-first-react-c9.appspot.com",
  messagingSenderId: "870410295071",
  appId: "1:870410295071:web:2c1640b13a0b21ef44022a"
};

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const handleUpload = (e) => {
    e.preventDefault();
    if(!selectedFile) {
      alert('Please select a file first!')
      return
    }
    // connect to our bucket
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    // create a reference to our filename in storage
    const filename = selectedFile.name;
    const imageRef = ref(storage, 'photos/' + filename);
    // Todd's quick cheat to get the image url:
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-react-c9.appspot.com/o/photos%2F${filename}?alt=media`
    // now let's upload
    uploadBytes(imageRef, selectedFile)
      .then(() => setUploadedImage(url))
      .catch(alert)

  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleUpload}>
          <input type="file" accept='*/image' name="photo"
            onChange={e => setSelectedFile(e.currentTarget.files[0])}
          />
          <button type='submit'>Upload</button>
        </form>
        {uploadedImage && <img src={uploadedImage} alt="" />}
      </header>
    </div>
  );
}

export default App;
