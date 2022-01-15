
import './HeartIcon.css';
export const HeartIcon = ({liked}) => {
  return (
    <div className='heart-icon'>
      
      {liked ?
        <div className='animated-heart'>
          <svg className='heart-main' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1a5 5 0 00-5 5v.448c0 5.335 2.955 9.647 8.598 12.457a.902.902 0 00.804 0C16.046 16.095 19 11.783 19 6.448V6a5 5 0 00-9-3 4.992 4.992 0 00-4-2z"/>
          </svg>
          <svg className='heart-background' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1a5 5 0 00-5 5v.448c0 5.335 2.955 9.647 8.598 12.457a.902.902 0 00.804 0C16.046 16.095 19 11.783 19 6.448V6a5 5 0 00-9-3 4.992 4.992 0 00-4-2z"/>
          </svg>
        </div>
        :
        <svg className='heart-grey' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 1a5 5 0 00-5 5v.448c0 5.335 2.955 9.647 8.598 12.457a.902.902 0 00.804 0C16.046 16.095 19 11.783 19 6.448V6a5 5 0 00-9-3 4.992 4.992 0 00-4-2z"/>
        </svg>}
    </div>
  )
}
