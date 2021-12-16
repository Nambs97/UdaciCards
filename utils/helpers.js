import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications, Permissions } from 'expo';

import { QUIZ_DONE_COUNT } from '../components/Quiz';

const dateKey = new Date().toLocaleDateString();

export function clearLocalNotifications() {
  Notifications.cancelAllScheduledNotificationAsync();
}

export function createNotification() {
  return {
    title: 'Take a Quiz today !',
    body: "Hey! Don't forget to take at least one Quiz on UdaciCards today.",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(QUIZ_DONE_COUNT)
    .then((result) => {
        if (result !== 'undefined') {
          result = JSON.parse(result);
          if (result[dateKey] === undefined ) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationAsync();

                  let notifDate = new Date();
                  notifDate.setHours(18);
                  notifDate.setMinutes(0);

                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: notifDate,
                      repeat: 'day'
                    }
                  )
                }
              })
          }
        }
    })
}
