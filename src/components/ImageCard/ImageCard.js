import './ImageCard.css'
import {
  Card,
  Image,
  TextContainer,
  Heading,
  Button,
  Subheading,
  Avatar,
  Stack,
  ButtonGroup,
  Tooltip
} from '@shopify/polaris';

import {DownloadIcon} from '../DownloadIcon';

import {HeartIcon} from '../HeartIcon'

export const ImageCard = ({image,
  likeAction: {onAction: onLikeAction, content: buttonLabel},
  liked
}) => {
  const {title, imageUrl, date, description} = image;
  return (
    <Card>
      <Card.Section>
        <Stack alignment="center">
          <Avatar name="Nasa" source="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" />
          <Heading element="h2">NASA</Heading>
        </Stack>
      </Card.Section>
      <Card.Section flush>
        <Image
          source={imageUrl}
          alt='space'
          width={'100%'}
          height={'100%'}
          />
      </Card.Section>
      <Card.Section>
        <TextContainer>
          <Heading element="h3">{title}</Heading>
          <Subheading element="p">PUBLISHED ON {date}</Subheading>
          <p>{description}</p>
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <ButtonGroup>
          <Tooltip content={liked ? 'Unlike' : 'Like'}>
            <Button
              plain
              removeUnderline
              onClick={() => onLikeAction(image)}
              accessibilityLabel={buttonLabel(image)}>
              <HeartIcon liked={liked}/>
            </Button>
          </Tooltip>
          <Tooltip content="Download">
            <Button
              plain
              removeUnderline
              download={imageUrl}
              url={imageUrl}
              accessibilityLabel='Download image'>
              <DownloadIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Card.Section>
    </Card>
  )
}
