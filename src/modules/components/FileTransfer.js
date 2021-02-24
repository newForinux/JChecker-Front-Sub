import { useState } from "react";
import Button from '@material-ui/core/Button';
import { CloudUpload } from '@material-ui/icons';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, makeStyles } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },

    buttonProgress: {
        color: blue[800],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -60,
    },
}));



const FileUploadComponent = () => {
    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [loading, setloading] = useState(false);

    const notify = (arg) => {
        if (arg === 'complete');
            
        //NEED TODO using snackbar
        
    }

    
    const fileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('/api/upload', formData, {
            /*
            params: {
                studentNum: '21600065',
                assignment: 'hw3'
            },
            */
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })  
    };


    const upload = (e) => {
        e.preventDefault();
        setdisabled(true)
        fileUpload(file)
            .then((response) => {
                setloading(false)
                console.log(response.data)
                notify('complete')
            })
            .catch((response) => {
                setloading(false)
                console.log(response.data)
                notify('error')
            })
    };


    const fileChange = (e) => {
        setfile(e.target.files[0])
        setdisabled(false)
    };


    const handleClick = () => {
        if (!disabled) {
            setloading(true);
        }
    }


    return (
        <div>
            <form onSubmit={upload}>
                <h1>파일 업로드</h1>
                <input accept="application/zip" type="file" onChange={fileChange} name="file" />      
                <div className={classes.wrapper}>
                    <Button type="submit" variant="contained" color="primary" size="large" startIcon={<CloudUpload />} disabled={disabled} onClick={handleClick}>
                        Upload
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </div>   
    )
}

export default FileUploadComponent;