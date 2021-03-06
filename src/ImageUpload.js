import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from './firebase'
import firebase from 'firebase'
import './ImageUpload.css'

const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState('')
    const [image, setImage] = useState(null)

    const handleChange = (event) => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`image/${image.name}`).put(image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage.ref('image').child(image.name).getDownloadURL().then(
                    url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(null)
                    }
                )
            }
        )
    }

    return (
        <div className="imageupload">
            <progress value={progress} max="100" className="imageupload_progress"></progress>
            <input type="text" placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
