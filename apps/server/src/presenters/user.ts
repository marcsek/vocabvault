import { getUserChildren, getUserStats } from '../use-cases/user/index.js';
import { getUserParent } from '../use-cases/user/getUserParent.js';
import { generateS3PresignedUrl } from '../s3/s3Provider.js';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

type TPresentUserChildren = Awaited<ReturnType<typeof getUserChildren>>;

export const presentUserChildren = async (childrenToParse: TPresentUserChildren) => {
  const parsedChildren = childrenToParse?.Parent?.children.map(async (child) => {
    const profileImage = await generateS3PresignedUrl(child.user.profileImage);

    return { id: child.user.id, name: child.user.name, profileImage };
  });

  if (!parsedChildren) return;

  return await Promise.all(parsedChildren);
};

type TPresentUserParent = Awaited<ReturnType<typeof getUserParent>>;

export const presentUserParent = async (parentToParse: TPresentUserParent) => {
  const parent = parentToParse?.Child?.parent?.user;

  if (!parent) return undefined;

  const profileImage = await generateS3PresignedUrl(parent.profileImage);

  return { id: parent.id, name: parent.name, profileImage: profileImage };
};

export const generateUserProfileImageUrl = async <T extends { profileImage: string }>(user: T) => {
  const signedUrl = await generateS3PresignedUrl(user.profileImage);

  return { ...user, profileImage: signedUrl };
};

type TPresentUserStats = Awaited<ReturnType<typeof getUserStats>>;

export const presentUserStats = async (dataToParse: TPresentUserStats) => {
  const dataList = dataToParse?.sessionHistory;

  if (!dataList) return undefined;

  const totalEntries = dataList.length;
  let timeSum = 0;
  let accSum = 0;

  const avgMovement: { time: string; value: number }[] = [];
  const avgMovementDay: { time: string; value: number }[] = [];

  const maxChartHistoryInMonth = 4;
  const startingWeek = dayjs().subtract(4 * maxChartHistoryInMonth - 1, 'week');
  const startingDate = dayjs().subtract(181, 'days');

  const array: [number, number][] = Array.from(Array(maxChartHistoryInMonth * 4), (_, idx) => [
    dayjs(startingWeek.add(idx, 'week')).week(),
    0,
  ]);
  const sArray: [number, number][] = Array.from(Array(182), (_, idx) => [dayjs(startingDate.add(idx, 'day')).dayOfYear(), 0]);

  const weekMap = new Map<number, number>(array);
  const dayMap = new Map<number, number>(sArray);

  for (const stat of dataList) {
    timeSum += (stat.endedAt.getTime() - stat.startedAt.getTime()) / 1000;
    accSum += stat.SessionStatistics ? stat.SessionStatistics.accuracy : 0;

    const curWeek = dayjs(new Date(stat.endedAt)).week();
    const foundRecord = weekMap.get(curWeek);

    if (foundRecord !== undefined) {
      weekMap.set(curWeek, foundRecord + 1);
    }

    const curDay = dayjs(new Date(stat.endedAt)).dayOfYear();
    const foundRecordDay = dayMap.get(curDay);

    if (foundRecordDay !== undefined) {
      dayMap.set(curDay, foundRecordDay + 1);
    }
  }

  for (const [week, value] of weekMap) {
    const weekDate = dayjs().week(week);

    const numOfWeekInMonth = week - weekDate.month() * 4;
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(weekDate.toDate());
    const formattedDate = numOfWeekInMonth + '/' + monthName;

    avgMovement.push({ time: formattedDate, value: value });
  }

  for (const [day, value] of dayMap) {
    let correctDate = dayjs().dayOfYear(day);

    if (day > dayjs().dayOfYear()) {
      correctDate = dayjs().dayOfYear(day).subtract(1, 'year');
    }

    avgMovementDay.push({ time: correctDate.toDate().toISOString(), value });
  }

  return {
    avgTime: Math.floor(timeSum / totalEntries),
    avgAccuracy: Math.floor(accSum / totalEntries),
    avgMovement,
    avgMovementDay,
    totalSessions: dataList.length,
  };
};
