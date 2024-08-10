import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const API_KEY = '44144688-c01866d86661ec8d15999300c';
const URL = 'https://pixabay.com/api/';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(URL, {
          params: {
            key: API_KEY,
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: currentPage,
          },
        });
        if (response.data.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, no images found. Please try a different query.'
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        Notiflix.Notify.success(`Found ${response.data.totalHits} images!`);
      } catch (error) {
        Notiflix.Notify.failure(
          'An error occurred while fetching images. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={toggleModal} />
      {isLoading && <Loader />}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </div>
  );
}

export default App;
