import { Button, IconButton, LinearProgress, Pagination, Rating, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewAsync, resetReviewAddStatus, resetReviewDeleteStatus, resetReviewUpdateStatus, selectReviewAddStatus, selectReviewDeleteStatus, selectReviewStatus, selectReviewUpdateStatus, selectReviews } from '../ReviewSlice'
import { ReviewItem } from './ReviewItem'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import CreateIcon from '@mui/icons-material/Create';
import {MotionConfig, motion} from 'framer-motion'
import { useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export const Reviews = ({productId,averageRating}) => {

    const dispatch=useDispatch()
    const reviews=useSelector(selectReviews)
    const [value,setValue]=useState(1)
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const loggedInUser=useSelector(selectLoggedInUser)
    const reviewStatus=useSelector(selectReviewStatus)
    const ref=useRef(null)
    


    const reviewAddStatus=useSelector(selectReviewAddStatus)
    const reviewDeleteStatus=useSelector(selectReviewDeleteStatus)
    const reviewUpdateStatus=useSelector(selectReviewUpdateStatus)

    const [writeReview,setWriteReview]=useState(false)
    const theme=useTheme()

    const is840=useMediaQuery(theme.breakpoints.down(840))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{

        if(reviewAddStatus==='fulfilled'){
            toast.success("Review added")
        }
        else if(reviewAddStatus==='rejected'){
            toast.error("Error posting review, please try again later")
        }

        reset()
        setValue(1)
        
    },[reviewAddStatus])

    useEffect(()=>{

        if(reviewDeleteStatus==='fulfilled'){
            toast.success("Review deleted")
        }
        else if(reviewDeleteStatus==='rejected'){
            toast.error("Error deleting review, please try again later")
        }
    },[reviewDeleteStatus])

    useEffect(()=>{

        if(reviewUpdateStatus==='fulfilled'){
            toast.success("Review updated")
        }
        else if(reviewUpdateStatus==='rejected'){
            toast.error("Error updating review, please try again later")
        }
    },[reviewUpdateStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetReviewAddStatus())
            dispatch(resetReviewDeleteStatus())
            dispatch(resetReviewUpdateStatus())
        }
    },[])

    const ratingCounts={
        5:0,
        4:0,
        3:0,
        2:0,
        1:0
    }

    reviews.map((review)=>{
        ratingCounts[review.rating]=ratingCounts[review.rating]+1
    })


    const handleAddReview=(data)=>{
        const review={...data,rating:value,user:loggedInUser._id,product:productId}
        dispatch(createReviewAsync(review))
        setWriteReview(false)
    }

    

  return (
        <Stack rowGap={5} alignSelf={"center"} width={is480?"90vw":is840?"25rem":'40rem'} sx={{ alignItems: 'center' }}>


            <Stack sx={{ width: '100%', alignItems: 'center' }}>
                <Typography gutterBottom variant='h4' fontWeight={400} sx={{ color: '#FFFFFF', textAlign: 'center' }}>Reviews</Typography>
                {
                    reviews?.length?(
                        <Stack rowGap={3}>

                            <Stack rowGap={1} >
                                <Typography variant='h2' fontWeight={800}>{averageRating}.0</Typography>
                                <Rating readOnly value={averageRating}/>
                                <Typography variant='h6' color={'text.secondary'} >Based on {reviews.length} {reviews.length===1?"Review":"Reviews"}</Typography>
                            </Stack>

                            <Stack rowGap={2}>
                                {
                                    [5,4,3,2,1].map((number)=>(
                                        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} columnGap={1}>
                                            <Typography sx={{whiteSpace:"nowrap", color: '#FFFFFF'}}>{number} star</Typography>
                                            <LinearProgress 
                                                sx={{
                                                    width:"100%",
                                                    height:"1rem",
                                                    borderRadius:"4px",
                                                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: '#8B5CF6'
                                                    }
                                                }} 
                                                variant='determinate' 
                                                value={(ratingCounts[number]/reviews?.length)*100}
                                            />   
                                            <Typography sx={{ color: '#FFFFFF' }}>{parseInt(ratingCounts[number]/reviews?.length*100)}%</Typography>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                        </Stack>

                    ):(
                        <Typography variant='h6' color={'text.secondary'} fontWeight={400}>{loggedInUser?.isAdmin?"There are no reviews currently":"Be the one to post review first"}</Typography>
                    )

                }


            </Stack>

            {/* reviews mapping */}
            <Stack rowGap={2} sx={{ width: '100%' }}>
                {reviews?.map((review)=>(<ReviewItem key={review._id} id={review._id} userid={review.user._id} comment={review.comment} createdAt={review.createdAt} rating={review.rating} username={review.user.name} />))}
            </Stack>

            
            {   
                // add review form
                writeReview?
                (
                <Stack rowGap={3} position={'relative'} component={'form'} noValidate onSubmit={handleSubmit(handleAddReview)} sx={{ width: '100%', alignItems: 'center' }}>

                    <TextField 
                      id='reviewTextFeild' 
                      {...register("comment",{required:true})} 
                      sx={{
                        mt:4,
                        width:is840?"100%":"40rem",
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          background: 'rgba(15, 15, 35, 0.6)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8B5CF6',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8B5CF6',
                            borderWidth: 2,
                          },
                          '& .MuiInputBase-input': {
                            color: '#FFFFFF',
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94A3B8',
                          },
                        },
                      }}  
                      multiline 
                      rows={6} 
                      fullWidth 
                      placeholder='Write a review...'
                    />
                    
                    <Stack sx={{ width: '100%', alignItems: 'center' }}>
                        <Typography gutterBottom variant='body2' sx={{ color: '#FFFFFF', textAlign: 'center' }}>How much did you like the product?</Typography>
                        <motion.div style={{width:"fit-content"}} whileHover={{scale:1.050,x:2}} whileTap={{scale:1}}>
                            <Rating size='large' value={value} onChange={(e) => setValue(e.target.value)} sx={{ color: '#8B5CF6' }}/>
                        </motion.div>
                    </Stack>
                    
                    <Stack flexDirection={'row'} alignItems={'center'} columnGap={'.2rem'} sx={{ mt: 2 }}>
                        <MotionConfig whileTap={{scale:1}} whileHover={{scale:1.050}}>
                            <motion.div>
                                <LoadingButton 
                                  sx={{
                                    textTransform:"none",
                                    fontSize:is480?"":"1rem",
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                    '&:hover': {
                                      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                    },
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                    '&:hover': {
                                      boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)',
                                    }
                                  }} 
                                  size={is480?"small":""} 
                                  loading={reviewStatus==='pending'} 
                                  type='submit' 
                                  variant='contained'
                                >
                                  Add review
                                </LoadingButton>
                            </motion.div>
                            <motion.div>
                                <Button 
                                  onClick={()=>setWriteReview(false)} 
                                  size={is480?"small":""} 
                                  variant='outlined' 
                                  sx={{
                                    textTransform:"none",
                                    fontSize:is480?"":"1rem",
                                    borderColor: '#EF4444',
                                    color: '#EF4444',
                                    '&:hover': {
                                      borderColor: '#F87171',
                                      color: '#F87171',
                                      background: 'rgba(239, 68, 68, 0.1)',
                                    }
                                  }}
                                >
                                  Cancel
                                </Button>
                            </motion.div>
                        </MotionConfig>
                    </Stack>

                </Stack>
                )
                :
                !loggedInUser?.isAdmin?
                <Stack sx={{ width: '100%', alignItems: 'center', mt: 3, mb: 2 }}>
                    <motion.div onClick={()=>setWriteReview(!writeReview)} whileHover={{scale:1.050}} whileTap={{scale:1}} style={{width:"fit-content"}}>
                            <Button  
                              disableElevation 
                              size={is480?"medium":'large'} 
                              variant='contained' 
                              sx={{
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                },
                                textTransform:"none",
                                fontSize:"1rem",
                                borderRadius:'8px',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                '&:hover': {
                                  boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)',
                                }
                              }}  
                              startIcon={<CreateIcon/>}
                            >
                              Write a review
                            </Button>
                    </motion.div>
                </Stack>:""
            }
        </Stack>
  )
}
