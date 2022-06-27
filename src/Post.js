import React, {useState, useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import {db} from './firebase'
import firebase from 'firebase'

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    
    useEffect(() => {
        let unsubscribe
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault()
        db.collection("posts").doc(postId).collection("comments").add({
            username: user.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('')
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="Roger Federer" src="https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/3/2/55d4aba6a570417280c790d119c91ee7_18.jpg" />
            <h3>{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong>Ramcharan: </strong>{caption}</h4>
            <div className="post__comments">
                {
                     comments.map(comment => 
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    )
                }
            </div>
            {user && <form className="post__commentbox">
                <input 
                    type="text" 
                    className="post__input" 
                    placeholder="Add a comment..." 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} 
                />
                <button
                    type="submit"
                    className="post__button"
                    disabled={!comment}
                    onClick={event => postComment(event)}
                >Post</button>
            </form>}
        </div>
    )
}

export default Post
