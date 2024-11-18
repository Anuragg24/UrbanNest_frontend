import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../../../redux/features/message/messageApi'; // Import the RTK Query hook

const Contacted = () => {
  const { user } = useSelector((state) => state.auth); // Get user data from Redux store

  // Fetch messages using the RTK Query hook
  const { data: messages, error, isLoading, isError } = useGetMessagesQuery(user?.id || null, {
    skip: !user?.id, // Skip the request if no user is logged in
  });

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6">Please Log In</h2>
        <p>You need to be logged in to view your messages.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Messages</h2>
      {isLoading ? (
        <p>Loading your messages...</p>
      ) : isError ? (
        <p>Error loading messages: {error?.message}</p>
      ) : (
        <div className="space-y-4">
          {messages?.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <p><strong>Name:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Message:</strong> {message.message}</p>
              </div>
            ))
          ) : (
            <p>You have no messages.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Contacted;
