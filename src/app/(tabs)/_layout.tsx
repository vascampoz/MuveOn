import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useEffect } from 'react';
import { theme } from '@/constants/theme';
import { Home, Dumbbell, TrendingUp, Users, User } from 'lucide-react-native';

import HomeScreen from './index';
import TrainScreen from './train';
import ProgressScreen from './progress';
import TeamScreen from './team';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  const tabOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.border,
      paddingBottom: 8,
      paddingTop: 8,
      height: 60,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.textSecondary,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600' as const,
    },
  } as BottomTabNavigationOptions;

  return (
    <Tab.Navigator
      screenOptions={tabOptions}
      sceneContainerStyle={{ backgroundColor: theme.colors.background }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="train"
        component={TrainScreen}
        options={{
          title: 'Treino',
          tabBarIcon: ({ color, size }) => (
            <Dumbbell color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="progress"
        component={ProgressScreen}
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => (
            <TrendingUp color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="team"
        component={TeamScreen}
        options={{
          title: 'Time',
          tabBarIcon: ({ color, size }) => (
            <Users color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
