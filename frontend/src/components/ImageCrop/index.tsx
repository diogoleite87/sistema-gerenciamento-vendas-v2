import { useState } from 'react'

import ReactCrop, { type Crop } from 'react-image-crop'

import { RotateLeft, CloudUpload, DoneOutline } from "@mui/icons-material"
import { Button, Grid, InputLabel } from '@mui/material';

import 'react-image-crop/dist/ReactCrop.css';


interface IImageCropProps {
    setImage(state: string): void,
    buttonMsg?: string,
    cropConfig?: Crop,
    aspect: '1:1' | '16:9'
}

export default function ImageCrop({ setImage, buttonMsg = 'Escolher Imagem', cropConfig = {
    unit: 'px',
    x: 50,
    y: 50,
    width: 200,
    height: 200
}, aspect }: IImageCropProps) {

    const [crop, setCrop] = useState<Crop>(cropConfig);
    const [resetImage, setResetImage] = useState<string>('')
    const [src, setSrc] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : '';
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSrc(imageUrl);
            setResetImage(imageUrl)
        }
    };

    const handleReset = () => {
        setSrc(resetImage)
        setCrop(cropConfig)
    }

    const handleSubmit = () => {


        if (src) {
            const imageSrc = new Image();
            imageSrc.src = src;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = crop.width;
            canvas.height = crop.height;

            if (ctx)
                ctx.drawImage(
                    imageSrc,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

            const croppedImageUrl = canvas.toDataURL('image/jpeg');

            const croppedImageWithoutPrefix = croppedImageUrl.substring('data:image/jpeg;base64,'.length);

            setSrc(croppedImageUrl);
            setCrop({
                unit: 'px',
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

            setImage(croppedImageWithoutPrefix);

        }
    }

    return (
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item container spacing={2} direction={'row'} justifyContent='center' alignItems='center'>
                <Grid item>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <InputLabel htmlFor="fileInput">
                        <Button
                            variant="contained"
                            startIcon={<CloudUpload />}
                            component="span"
                            size='small'
                        >
                            {buttonMsg}
                        </Button>
                    </InputLabel>
                </Grid>
                {src ? <><Grid item>

                    <Button variant='contained' size='small' color='warning' onClick={handleReset}>
                        <RotateLeft />
                    </Button>
                </Grid>
                    <Grid item>
                        <Button variant='contained' size='small' color='success' onClick={handleSubmit}>
                            <DoneOutline />
                        </Button>
                    </Grid> </> : <></>}
            </Grid>
            <Grid item >
                {src && (
                    <ReactCrop
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        aspect={aspect === '1:1' ? 1 : 16 / 9}
                    >
                        <img src={src} />
                    </ReactCrop>
                )}
            </Grid>
        </Grid>
    )
}