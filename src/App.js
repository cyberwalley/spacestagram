import './Variables.css';
import {
  Page,
  Popover,
  Button,
  DatePicker,
  ActionList
} from '@shopify/polaris';

import {Header} from './components/Header';
import {HeroImage} from './components/HeroImage';
import {Footer} from './components/Footer';
import {ImageCard} from './components/ImageCard';
import {Skeleton} from './components/Skeleton';
import {useState, useEffect} from 'react';
import {covertDateFormat} from './components/HelperFunction'


function App() {
  const [imageItems, setImageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedImages, setLikedImages] = useState([]);
  const [popoverActive, setPopoverActive] = useState(false);

  // set current month and year
  const date = new Date();
  const CURRENT_MONTH = date.getMonth();
  const CURRENT_YEAR = date.getFullYear() 
  const [{month, year}, setDate] = useState({
    month: CURRENT_MONTH,
    year: CURRENT_YEAR
  });
  //set current date
  const TODAY = date.toGMTString()
  const FIRST_DAY_OF_THE_MONTH = new Date(date.getFullYear(), date.getMonth(), 1);
  //week starts from sunday
  const FIRST_DAY_OF_THE_WEEK = new Date(date.setDate(date.getDate() - date.getDay())).toGMTString();
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(TODAY),
    end: new Date(TODAY),
  });
  const apiSettings = {
    apiURL: "https://api.nasa.gov/planetary/apod",
    apiKey: "NgYi8bUazwJQRoa0edUHBdYCTZzRwg2QLpUTfaXG",
    startDate: covertDateFormat(selectedDates.start),
    endDate: covertDateFormat(selectedDates.end)
  };
  const nasaImageURL = `${apiSettings.apiURL}?api_key=${apiSettings.apiKey}&start_date=${apiSettings.startDate}&end_date=${apiSettings.endDate}`

  //pulls images from local storage
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('NasaImages'));
    if (localStorageItems) {
      setLikedImages(localStorageItems)
    }
  }, [])

  // saves images to local storage
  useEffect(() => {
    localStorage.setItem('NasaImages', JSON.stringify(likedImages));
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
      Select a date range
    </Button>
  );

  const handleMonthChange = (month, year) => (setDate({month, year}));


    //Fetch API Data
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
            setImageItems(data);
          } 
        } catch (error) {
          console.log(error)
        }
      }
      fetchImageData()
    }, [nasaImageURL])
    
    //loop through data and store in an object
    const images = imageItems.map(({title, url, date, explanation, media_type}) => {
      return {
        title: title,
        imageUrl: url,
        date: date,
        description: explanation,
        mediaType: media_type,
        isLiked: likedImages.some((image) => image.imageUrl === url)
      }
    })
      
    const nasaImageMarkup = images.map((image) => {
      return (
        <ImageCard key={image.imageUrl} image={image} liked={image.isLiked}
          likeAction={{
            onAction: handleLike,
            content: ({isLiked}) => (isLiked ? "Unlike image" : "Like image")
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
          sectioned={true}
          preferredAlignment="left"
          fullHeight={true}
        >
          <ActionList
          items={[
            {
              content: 'Today',
              onAction: ()=> setSelectedDates({
                start: new Date(TODAY),
                end: new Date(TODAY),
              }),
            },
            {
              content: 'This Week',
              onAction: ()=> setSelectedDates({
                start: new Date(FIRST_DAY_OF_THE_WEEK),
                end: new Date(TODAY),
              }),
            },
            {
              content: 'This month',
              onAction: ()=> setSelectedDates({
                start: new Date(FIRST_DAY_OF_THE_MONTH),
                end: new Date(TODAY),
              }),
            },
          ]}
        />
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            disableDatesAfter={new Date(TODAY)}
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
