import React, { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorTimeSlotManager = () => {
  const { dtoken } = useContext(DoctorContext);

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const allTimeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
  ];

  const [schedule, setSchedule] = useState(
    days.map((day) => ({
      day,
      isActive: false,
      slots: [],
    })),
  );

  const [selectedDay, setSelectedDay] = useState("MON");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch doctor's current available schedule
  useEffect(() => {
    const fetchAvailableSchedule = async () => {
      try {
        setLoading(true);
        const backendUrl = import.meta.env.PROD ? "" : "";
        const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
          headers: {
            dtoken: dtoken,
          },
        });

        if (data.success && data.profileData?.availableSchedule?.length > 0) {
          setSchedule(data.profileData.availableSchedule);
        } else {
          // Initialize with default schedule if empty
          setSchedule(
            days.map((day) => ({
              day,
              isActive: false,
              slots: [],
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching available schedule:", error);
        toast.error("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    if (dtoken) {
      fetchAvailableSchedule();
    }
  }, [dtoken]);

  // Get current day's schedule
  const currentDaySchedule = schedule.find((s) => s.day === selectedDay);

  // Toggle day active/inactive
  const handleToggleDayActive = (day) => {
    setSchedule((prev) =>
      prev.map((s) => (s.day === day ? { ...s, isActive: !s.isActive } : s)),
    );
  };

  // Toggle slot for selected day
  const handleSlotToggle = (slot) => {
    setSchedule((prev) =>
      prev.map((s) =>
        s.day === selectedDay
          ? {
              ...s,
              slots: s.slots.includes(slot)
                ? s.slots.filter((t) => t !== slot)
                : [...s.slots, slot],
            }
          : s,
      ),
    );
  };

  // Select all slots for selected day
  const handleSelectAllForDay = () => {
    setSchedule((prev) =>
      prev.map((s) =>
        s.day === selectedDay ? { ...s, slots: allTimeSlots } : s,
      ),
    );
  };

  // Clear all slots for selected day
  const handleClearAllForDay = () => {
    setSchedule((prev) =>
      prev.map((s) => (s.day === selectedDay ? { ...s, slots: [] } : s)),
    );
  };

  // Select all days as active
  const handleSelectAllDays = () => {
    setSchedule((prev) =>
      prev.map((s) => ({
        ...s,
        isActive: true,
      })),
    );
  };

  // Clear all days (make inactive)
  const handleClearAllDays = () => {
    setSchedule((prev) =>
      prev.map((s) => ({
        ...s,
        isActive: false,
        slots: [],
      })),
    );
  };

  // Save schedule to backend
  const handleSaveSchedule = async () => {
    try {
      setIsSaving(true);

      // Validate that at least one day is active
      if (!schedule.some((s) => s.isActive)) {
        toast.warn("Please activate at least one day");
        return;
      }

      // Validate that each active day has at least one slot
      for (let s of schedule) {
        if (s.isActive && s.slots.length === 0) {
          toast.warn(`Please select at least one slot for ${s.day}`);
          return;
        }
      }

      const backendUrl = import.meta.env.PROD ? "" : "";
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-available-schedule`,
        { availableSchedule: schedule },
        {
          headers: {
            dtoken: dtoken,
          },
        },
      );

      if (data.success) {
        toast.success("Schedule updated successfully!");
      } else {
        toast.error(data.message || "Failed to update schedule");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Failed to save schedule");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading schedule...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Manage Your Work Schedule
        </h2>
        <p className="text-gray-600">
          Select the days you work and set your available time slots for each
          day.
        </p>
      </div>

      {/* Days Overview */}
      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Work Days</h3>
          <div className="flex gap-2">
            <button
              onClick={handleSelectAllDays}
              className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition"
            >
              Activate All
            </button>
            <button
              onClick={handleClearAllDays}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              Deactivate All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {days.map((day) => {
            const daySchedule = schedule.find((s) => s.day === day);
            const isActive = daySchedule?.isActive;
            const slotCount = daySchedule?.slots?.length || 0;

            return (
              <div key={day} className="text-center">
                <button
                  onClick={() => {
                    handleToggleDayActive(day);
                    setSelectedDay(day);
                  }}
                  className={`w-full p-3 rounded border-2 font-medium transition text-sm ${
                    isActive
                      ? selectedDay === day
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-green-100 border-green-400 text-green-800"
                      : "bg-gray-100 border-gray-300 text-gray-600 opacity-50"
                  }`}
                >
                  {day}
                </button>
                {isActive && (
                  <p className="text-xs text-green-600 mt-1 font-semibold">
                    {slotCount} slots
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Slots for Selected Day */}
      {currentDaySchedule && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">
              {currentDaySchedule.day} - Available Slots
              {!currentDaySchedule.isActive && (
                <span className="text-red-500 text-sm ml-2">
                  (Day Inactive)
                </span>
              )}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAllForDay}
                disabled={!currentDaySchedule.isActive}
                className={`px-3 py-1 text-sm rounded transition ${
                  currentDaySchedule.isActive
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Select All
              </button>
              <button
                onClick={handleClearAllForDay}
                disabled={!currentDaySchedule.isActive}
                className={`px-3 py-1 text-sm rounded transition ${
                  currentDaySchedule.isActive
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allTimeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  if (currentDaySchedule.isActive) {
                    handleSlotToggle(slot);
                  }
                }}
                disabled={!currentDaySchedule.isActive}
                className={`p-3 rounded border-2 font-medium transition text-sm ${
                  currentDaySchedule.isActive
                    ? currentDaySchedule.slots.includes(slot)
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:border-blue-300"
                    : "bg-gray-100 border-gray-300 text-gray-400 opacity-50 cursor-not-allowed"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white border border-blue-300 rounded">
            <p className="text-sm text-blue-900">
              <strong>{currentDaySchedule.slots.length}</strong> slot(s)
              selected for {currentDaySchedule.day}
            </p>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-gray-800 mb-2">Summary</h3>
        <div className="text-sm text-gray-700">
          <p>
            <strong>Active Days:</strong>{" "}
            {schedule.filter((s) => s.isActive).length}/{days.length}
          </p>
          <p className="mt-1">
            <strong>Days with Slots Configured:</strong>{" "}
            {schedule.filter((s) => s.isActive && s.slots.length > 0).length}
          </p>
          <p className="mt-1">
            <strong>Total Slots:</strong>{" "}
            {schedule.reduce(
              (total, s) => total + (s.isActive ? s.slots.length : 0),
              0,
            )}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={handleSaveSchedule}
          disabled={isSaving}
          className={`px-6 py-2 rounded font-medium text-white transition ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : "Save Schedule"}
        </button>
      </div>
    </div>
  );
};

export default DoctorTimeSlotManager;
