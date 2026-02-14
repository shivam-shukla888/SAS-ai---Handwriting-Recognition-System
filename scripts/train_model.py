
"""
SAS ai - CNN Handwriting Recognition Training Script
Author: Senior AI Engineer
Description: Production-ready training script for handwriting classification using TensorFlow/Keras.
"""

import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

# Configuration
IMG_SIZE = (128, 128)
BATCH_SIZE = 32
EPOCHS = 25
MODEL_PATH = 'sas_cnn_model.keras'

def build_model(num_classes=10):
    """Hybrid CNN architecture for robust handwriting recognition"""
    model = models.Sequential([
        # Initial Convolutional Block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE[0], IMG_SIZE[1], 1)),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        # Deeper Convolutional Blocks
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        # Flatten and Dense Layers
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model

def load_mnist_data():
    """Load and preprocess standard MNIST dataset"""
    mnist = tf.keras.datasets.mnist
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    
    # Resizing and normalizing for the CNN
    x_train = np.expand_dims(x_train, axis=-1) / 255.0
    x_test = np.expand_dims(x_test, axis=-1) / 255.0
    
    # Resize to our standard size using tf.image
    x_train = tf.image.resize(x_train, IMG_SIZE)
    x_test = tf.image.resize(x_test, IMG_SIZE)
    
    return x_train, y_train, x_test, y_test

def train_on_custom_data(data_dir):
    """Training pipeline for user-uploaded custom datasets"""
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        zoom_range=0.1,
        width_shift_range=0.1,
        height_shift_range=0.1,
        validation_split=0.2
    )
    
    train_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=IMG_SIZE,
        color_mode='grayscale',
        batch_size=BATCH_SIZE,
        class_mode='sparse',
        subset='training'
    )
    
    validation_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=IMG_SIZE,
        color_mode='grayscale',
        batch_size=BATCH_SIZE,
        class_mode='sparse',
        subset='validation'
    )
    
    num_classes = len(train_generator.class_indices)
    model = build_model(num_classes)
    
    # Callbacks for production training
    callbacks = [
        ModelCheckpoint(MODEL_PATH, save_best_only=True),
        EarlyStopping(patience=5, restore_best_weights=True),
        ReduceLROnPlateau(factor=0.2, patience=3)
    ]
    
    history = model.fit(
        train_generator,
        validation_data=validation_generator,
        epochs=EPOCHS,
        callbacks=callbacks
    )
    
    return model, history

if __name__ == "__main__":
    print("Initializing SAS ai Training Pipeline...")
    # Default to MNIST for initial setup
    x_train, y_train, x_test, y_test = load_mnist_data()
    model = build_model(10)
    
    history = model.fit(x_train, y_train, 
                        epochs=EPOCHS, 
                        validation_data=(x_test, y_test),
                        batch_size=BATCH_SIZE)
    
    model.save(MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")