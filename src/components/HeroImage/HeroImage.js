import './HeroImage.css';
import { Heading } from '@shopify/polaris';

export const HeroImage = () => {
  return (
    <div className="hero-wrapper">
      <Heading element="h1">Photo of the day</Heading>
      <p className="mega-subtitle">Brought to you by NASA's Image API</p>
    </div>
  )
}
