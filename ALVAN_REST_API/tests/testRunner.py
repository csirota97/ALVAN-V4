import threading
import traceback

error_count = 0
passing_count = 0
failing_count = 0
failing_tests = []

def runTest(test):
  global passing_count, failing_count, failing_tests, error_count

  try:
    print(test[0])
    result = test[1](test[2], test[3])
    if result:
      passing_count += 1
    else:
      failing_count += 1
      failing_tests.append(test[0])
      print("Expected: '{}'".format(test[3]))
    print(result)
  except:
    error_count += 1
    print('error')
    traceback.print_exc()
  print('\n')

def run(tests):
  global passing_count, failing_count, failing_tests, error_count

  print('\n')

  for test in tests:
    testThread = threading.Thread(target=runTest, args=([test]))
    testThread.start()
    testThread.join()


  print('\n'*2)
  print('--------------------------')
  print('Success:', passing_count)
  print('Error:', error_count)
  print('Fail:', failing_count)
  print('Failed Tests:')
  for test in failing_tests:
    print('  ***  {}'.format(test))

  print('\n')