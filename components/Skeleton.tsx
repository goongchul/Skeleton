import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { count } from 'console'

interface Props {
  width?: number // 가로너비
  height?: number // 세로너비
  circle?: boolean // 원형 스켈레톤
  rounded?: boolean // 둥근 모서리
  count?: number // inline 으로 선언 시, 글자 수
  unit?: string // width, height 단위
  animation?: boolean // 애니메이션 유무
  color?: string // 스켈레톤 색상
  style?: React.CSSProperties // 추가 스타일
}

// emotion 애니메이션 설정
const pulseKeyframe = keyframes`
  0% {
    opacity: 1
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

// emotion 애니메이션 설정
const pulseAnimation = css`
  animation ${pulseKeyframe} 1.5s ease-in0out infinite;
`

const Base = styled.span<Props>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ rounded }) => rounded && 'border-radius: 8px'};
  ${({ circle }) => circle && 'border-radius: 50%'};
  ${({ width, height }) => (width || height) && 'display: block'};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`

const Content = styled.span`
  opacity; 0;
`

export default function Skeleton({
  animation = true,
  width,
  height,
  circle,
  rounded,
  count,
  unit = 'px',
  color = '#F4F4F4',
  style,
}: Props) {
  // usememo로 로딩시간 메모이제이션
  const content = useMemo(
    () => [...Array({ length: count })].map(() => ''), //글자 길이만큼 빈 공간의 배열로 생성
    [count]
  )
  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      unit={unit}
      color={color}
    >
      <Content>{content}</Content>
    </Base>
  )
}
