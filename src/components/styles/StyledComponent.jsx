import {keyframes, Skeleton, styled} from '@mui/material'
import {Link as LinkComponent} from 'react-router-dom'
import { grayColor, lightTeal, teal } from '../constants/Color';

export const VisuallyHiddenInput = styled("input")({border: 0, clip: "rect(0 0 0 0)", height: 1, margin: -1, overflow: "hidden", padding: 0, position: "absolute", whiteSpace: "nowrap", width: 1,})

export const Link = styled(LinkComponent)`
    text-decoration: none; 
    color: black;
    padding: 1rem;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const InputBox = styled("input")`
    width: 100%;
    height: 150%;
    border: none;
    outline: none;
    padding: 0 3rem;
    border-radius: 1.5rem;
    background-color: ${grayColor};
`

export const SearchField = styled("input")`
    padding: 1rem 2rem;
    width: 20vmax;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    background-color: ${grayColor};
    font-size: 1.1rem;
`

export const CurveButton = styled("button")`
    border-radius: 1.5rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${teal};
    color: white;
    font-size: 1.1rem;
    &:hover {
        background-color: ${lightTeal}
    }
`

const bounceAnimation  = keyframes`
0% {transform: scale(1)}
50% {transform: scale(1.5)}
100% {transform: scale(1)}
`

export const BouncingSkeleton = styled(Skeleton)(()=>({
    animation: `${bounceAnimation} 1s infinite`
}))