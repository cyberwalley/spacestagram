import './Variables.css';
import {
  Page,
  Toast,
  Popover,
  Button,
  DatePicker
} from '@shopify/polaris';

import {Header} from './components/Header';
import {HeroImage} from './components/HeroImage';
import {Footer} from './components/Footer';
import {ImageCard} from './components/ImageCard';
import {Skeleton} from './components/Skeleton';
import {useState, useEffect} from 'react';


function App() {
  const [imageItems, setImageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedImages, setLikedImages] = useState([]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
  });
  const apiSettings = {
    apiURL: "https://api.nasa.gov/planetary/apod",
    apiKey: "NgYi8bUazwJQRoa0edUHBdYCTZzRwg2QLpUTfaXG",
    startDate: "2022-01-01",
    endDate: "2022-01-11"
  };
  const nasaImageURL = `${apiSettings.apiURL}?api_key=${apiSettings.apiKey}&start_date=${apiSettings.startDate}&end_date=${apiSettings.endDate}`
  

  //pulls images from local storage
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('NasaImages'));
    if (localStorageItems) {
      setLikedImages(localStorageItems)
    }
  }, [setLikedImages])

  // saves images to local storage
  useEffect(() => {
    localStorage.setItem('NasaImages', JSON.stringify(likedImages))
  
  }, [likedImages])

  //callback function to like images
  const handleLike = (image) => {
    //find the liked image
    const findLikedImage = likedImages.find((likedImage => likedImage.imageUrl === image.imageUrl))
    if (findLikedImage){
      //if found filter/remove it and then return the remaining  image
      setLikedImages(likedImages.filter(likedImage => likedImage.imageUrl !== image.imageUrl))
    } else {
      //if not found push it to the array and local storage
      setLikedImages((currentLikedImages) => [
        ...currentLikedImages,
        image,
      ]);
      localStorage.setItem('NasaImages', JSON.stringify(likedImages));
    }

  }

  const togglePopoverActive = () => setPopoverActive((popoverActive) => (!popoverActive));
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Select a date
    </Button>
  );

  const handleMonthChange = (month, year) => (setDate({month, year}));

  function fetchError(error) {
    return <Toast content={error} />
  }

 
    useEffect(() => {
      async function fetchImageData() {
        try {
          setIsLoading(() => true);
          const data = await fetch(`${nasaImageURL}`)
          .then((res) => res.json())
          .finally(() => {
            setIsLoading(() => false);
          })
          if (data) {
            const filtedImages = data.filter((filterData) => filterData.media_type === 'image')
            setImageItems(filtedImages);
          } 
        } catch (error) {
          console.log(error)
          fetchError(error)
        }
      }
      fetchImageData()
    }, [nasaImageURL])
    
      //loop through data and store in an object
      const images = imageItems.map(({title, url, date, explanation}) => {
        return {
          title: title,
          imageUrl: url,
          date: date,
          description: explanation,
          isLiked: likedImages.some((image) => image.imageUrl === url)
          
        }
      })
      
      const nasaImageMarkup = images.map((image) => {
        return (
          <ImageCard key={image.imageUrl} image={image} liked={image.isLiked}
            likeAction={{
              onAction: handleLike,
              content: ({isLiked}) => (isLiked ? "Unlike" : "Like")
            }}
          />
        )
      })

    
    


  return (
    <div className="site-wrapper">
      <Header />
      <HeroImage />
      <Page narrowWidth>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
          sectioned
          preferredAlignment="left"
        >
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            disableDatesBefore={new Date('Sat Feb 03 2018 00:00:00 GMT-0500 (EST)')}
            disableDatesAfter={new Date('Sun Feb 18 2018 00:00:00 GMT-0500 (EST)')}
            allowRange
          />
        </Popover>
        {isLoading ? <Skeleton /> : nasaImageMarkup}
        <Footer />
      </Page>
    </div>
  );
}

export default App;
