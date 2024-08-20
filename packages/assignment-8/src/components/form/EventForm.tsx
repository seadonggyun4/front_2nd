import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Tooltip,
    VStack
} from "@chakra-ui/react";
import {Event, RepeatType} from "../../types/types.ts";
import {NOTIFICATION_OPTION} from "../../constants/constants.ts";
import { ChangeEvent, FC } from "react";

const categories = ["업무", "개인", "가족", "기타"];

interface Props {
    title: string;
    setTitle: (title: string) => void;
    date: string;
    setDate: (date: string) => void;
    startTime: string;
    setStartTime: (startTime: string) => void;
    endTime: string;
    setEndTime: (endTime: string) => void;
    description: string;
    setDescription: (description: string) => void;
    location: string;
    setLocation: (location: string) => void;
    category: string;
    setCategory: (category: string) => void;
    isRepeating: boolean;
    setIsRepeating: (isRepeating: boolean) => void;
    repeatType: RepeatType;
    setRepeatType: (repeatType: RepeatType) => void;
    repeatInterval: number;
    setRepeatInterval: (repeatInterval: number) => void;
    repeatEndDate: string;
    setRepeatEndDate: (repeatEndDate: string) => void;
    editingEvent: Event | null;
    startTimeError: string | null;
    handleStartTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    validateTime: (start: string, end: string) => void;
    endTimeError: string | null;
    handleEndTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    notificationTime: number;
    setNotificationTime: (notificationTime: number) => void;
    addOrUpdateEvent: () => void;
}

const EventForm: FC<Props> = ({
      title,
      setTitle,
      date,
      setDate,
      startTime,
      endTime,
      description,
      setDescription,
      location,
      setLocation,
      category,
      setCategory,
      isRepeating,
      setIsRepeating,
      repeatType,
      setRepeatType,
      repeatInterval,
      setRepeatInterval,
      repeatEndDate,
      setRepeatEndDate,
      editingEvent,
      startTimeError,
      handleStartTimeChange,
      validateTime,
      endTimeError,
      handleEndTimeChange,
      notificationTime,
      setNotificationTime,
      addOrUpdateEvent,
    }) => {
    return(
        <VStack w="400px" spacing={5} align="stretch">
            <Heading>{editingEvent ? '일정 수정' : '일정 추가'}</Heading>

            <FormControl>
                <FormLabel>제목</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </FormControl>

            <FormControl>
                <FormLabel>날짜</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </FormControl>

            <HStack width="100%">
                <FormControl>
                    <FormLabel>시작 시간</FormLabel>
                    <Tooltip label={startTimeError} isOpen={!!startTimeError} placement="top">
                        <Input
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            onBlur={() => validateTime(startTime, endTime)}
                            isInvalid={!!startTimeError}
                        />
                    </Tooltip>
                </FormControl>
                <FormControl>
                    <FormLabel>종료 시간</FormLabel>
                    <Tooltip label={endTimeError} isOpen={!!endTimeError} placement="top">
                        <Input
                            type="time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            onBlur={() => validateTime(startTime, endTime)}
                            isInvalid={!!endTimeError}
                        />
                    </Tooltip>
                </FormControl>
            </HStack>

            <FormControl>
                <FormLabel>설명</FormLabel>
                <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
            </FormControl>

            <FormControl>
                <FormLabel>위치</FormLabel>
                <Input value={location} onChange={(e) => setLocation(e.target.value)}/>
            </FormControl>

            <FormControl>
                <FormLabel>카테고리</FormLabel>
                <Select data-testid="form_category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">카테고리 선택</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>반복 설정</FormLabel>
                <Checkbox data-testid="repeact-check-box" aria-label="repeact-check-box" isChecked={isRepeating} onChange={(e) => setIsRepeating(e.target.checked)}>
                    반복 일정
                </Checkbox>
            </FormControl>

            <FormControl>
                <FormLabel>알림 설정</FormLabel>
                <Select
                    data-testid="form_notification"
                    value={notificationTime}
                    onChange={(e) => setNotificationTime(Number(e.target.value))}
                >
                    {NOTIFICATION_OPTION.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>

            {isRepeating && (
                <VStack width="100%">
                    <FormControl>
                        <FormLabel>반복 유형</FormLabel>
                        <Select data-testid="form_repeat_type" value={repeatType} onChange={(e) => setRepeatType(e.target.value as RepeatType)}>
                            <option value="daily">매일</option>
                            <option value="weekly">매주</option>
                            <option value="monthly">매월</option>
                            <option value="yearly">매년</option>
                        </Select>
                    </FormControl>
                    <HStack width="100%">
                        <FormControl>
                            <FormLabel>반복 간격</FormLabel>
                            <Input
                                type="number"
                                value={repeatInterval}
                                onChange={(e) => setRepeatInterval(Number(e.target.value))}
                                min={1}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>반복 종료일</FormLabel>
                            <Input
                                type="date"
                                value={repeatEndDate}
                                onChange={(e) => setRepeatEndDate(e.target.value)}
                            />
                        </FormControl>
                    </HStack>
                </VStack>
            )}

            <Button data-testid="event-submit-button" onClick={addOrUpdateEvent} colorScheme="blue">
                {editingEvent ? '일정 수정' : '일정 추가'}
            </Button>
        </VStack>
    )
}

export default EventForm