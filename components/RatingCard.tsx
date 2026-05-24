import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native';
import { submitUserRatings } from '@/services/functionalities';

export default function RatingCard({ item }: any) {
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setLoading(true);

    const res = await submitUserRatings({
      id: String(item.id),
      desc,
      rat: String(rating),
    });

    setLoading(false);

    if (res?.response === true) {
      setSubmitted(true);
    } else {
      console.log('Error:', res);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.cafe_name}</Text>
      <Image
                  source={{ uri: item.image }}
                  style={styles.profileImage}
                />

      <View style={styles.row}>
        {[1,2,3,4,5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={styles.star}>
              {star <= rating ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        value={desc}
        onChangeText={setDesc}
      />


      <TouchableOpacity
        style={[
          styles.button,
          (rating === 0 || loading || submitted) && { opacity: 0.5 }
        ]}
        disabled={rating === 0 || loading || submitted}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {submitted ? 'Submitted ✅' : loading ? 'Sending...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 22,
    marginRight: 5,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2f80ed',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
},
});