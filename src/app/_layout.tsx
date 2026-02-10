import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Home, Dumbbell, TrendingUp, Users, User } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Home size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          title: 'Treinar',
          tabBarIcon: ({ color }) => (
            <Dumbbell size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color }) => (
            <TrendingUp size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Equipe',
          tabBarIcon: ({ color }) => (
            <Users size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <User size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.white,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
});
