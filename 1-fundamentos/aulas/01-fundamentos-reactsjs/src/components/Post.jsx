import { Comment } from './Comment';
import { Avatar } from './Avatar';
import styles from './Post.module.css';
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from "react";


// atributos  === props
export function Post({author, content, publishedAt}) {
    const [comments, setComments] = useState([
        "Post muito bacana ein!"
    ]);
    const [newComment, setNewComment] = useState("");

    console.log(newComment.length)
    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
      });
    const publishedDateFormatted = format(
        publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        {
          locale: ptBR,
        }
    );
  
    function handleCreateNewComment() {
        event.preventDefault();

        setComments([...comments, newComment]);

        setNewComment("")
    }

    function handleChangeNewComment() {
        event.target.setCustomValidity("")
        setNewComment(event.target.value)
    }

    function deleteComment(comment) {
        // imutabilidade ==> variaveis não sofrem mutação, deve ser criada uma nova variavel

        const commentsWithoutDeletedOne = comments.filter(
            (commentItem) => commentItem !== comment
        )
        setComments(commentsWithoutDeletedOne)

    }

    function handleNewCommentInvalid() {
       console.log(event)
       event.target.setCustomValidity("Esse campo é obrigatório.")
    }

    const isNewCommentEmpty = newComment.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={author.urlSrc} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => { 
                    if(line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if(line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    placeholder="Deixe um comentário"
                    onChange={handleChangeNewComment}
                    value={newComment}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map((comment) => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />);
                })};
            </div>
        </article>
    );
}
