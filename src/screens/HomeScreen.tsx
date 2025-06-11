import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Bubble from '../components/Bubble';

const HomeScreen = () => {
  const [gameState, setGameState] = useState<'start' | 'waiting' | 'ready' | 'result'>('start');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [inputFocused, setInputFocused] = useState(true);
  const [leaderboard, setLeaderboard] = useState<{ username: string; reactionTime: number }[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    setShowLeaderboard(false);
    setStartTime(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Use setTimeout with Date.now() for more natural, real-world delay
    timerRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setGameState('ready');
    }, Math.floor(Math.random() * 9700) + 300); // random between 300ms and 10,000ms
  };

  const handleBubblePress = () => {
    if (gameState === 'ready' && startTime !== null) {
      setReactionTime(Date.now() - startTime);
      setGameState('result');
    }
  };

  const handlePlayAgain = () => {
    setGameState('start');
    setReactionTime(null);
    setStartTime(null);
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setGameState('start');
      setInputFocused(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState === 'result' && reactionTime !== null && username.trim()) {
      setLeaderboard(prev =>
        [...prev, { username, reactionTime }]
          .sort((a, b) => a.reactionTime - b.reactionTime)
          .slice(0, 500)
      );
    }
    // eslint-disable-next-line
  }, [gameState]);

  return (
    <View style={[styles.container, gameState === 'ready' ? styles.greenScreen : null]}>
      {inputFocused && (
        <View style={styles.usernameContainer}>
          <Text style={styles.text}>Enter username:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoFocus
            placeholder="Username"
            placeholderTextColor="#888"
            onSubmitEditing={handleUsernameSubmit}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.startButton} onPress={handleUsernameSubmit}>
            <Text style={styles.startButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {!inputFocused && gameState === 'start' && (
        <>
          <Text style={styles.text}>Tap when green 🟩</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaderboardButton} onPress={() => setShowLeaderboard(true)}>
            <Text style={styles.leaderboardButtonText}>Leaderboard</Text>
          </TouchableOpacity>
        </>
      )}
      {!inputFocused && gameState === 'waiting' && (
        <Text style={styles.text}>Get ready...</Text>
      )}
      {!inputFocused && gameState === 'ready' && (
        <TouchableOpacity style={styles.fullScreenTouchable} onPress={handleBubblePress} />
      )}
      {!inputFocused && gameState === 'result' && reactionTime !== null && (
        <>
          <Text style={styles.text}>Reaction Time: {reactionTime.toFixed(3)} ms</Text>
          <TouchableOpacity style={styles.startButton} onPress={handlePlayAgain}>
            <Text style={styles.startButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaderboardButton} onPress={() => setShowLeaderboard(true)}>
            <Text style={styles.leaderboardButtonText}>Leaderboard</Text>
          </TouchableOpacity>
          {showLeaderboard && <Leaderboard leaderboard={leaderboard} />}
        </>
      )}
      {showLeaderboard && !inputFocused && gameState !== 'result' && (
        <Leaderboard leaderboard={leaderboard} />
      )}
    </View>
  );
};

const Leaderboard = ({ leaderboard }: { leaderboard: { username: string; reactionTime: number }[] }) => (
  <View style={styles.leaderboardContainer}>
    <Text style={styles.leaderboardTitle}>Leaderboard (Top 500)</Text>
    <FlatList
      data={leaderboard.slice(0, 500)}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => (
        <Text style={styles.leaderboardItem}>
          {index + 1}. {item.username}: {item.reactionTime.toFixed(3)} ms
        </Text>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Roboto',
    marginBottom: 32,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#1ec31e',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 32,
    marginTop: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  greenScreen: {
    backgroundColor: '#1ec31e',
  },
  fullScreenTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    fontSize: 20,
    borderRadius: 8,
    padding: 12,
    width: 250,
    marginBottom: 16,
  },
  usernameContainer: {
    alignItems: 'center',
    width: '100%',
  },
  leaderboardContainer: {
    marginTop: 32,
    width: '90%',
    maxHeight: 300,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
  },
  leaderboardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  leaderboardItem: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 2,
  },
  leaderboardButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 16,
  },
  leaderboardButtonText: {
    color: '#1ec31e',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

export default HomeScreen;